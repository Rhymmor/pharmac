import { validateSchema } from './validator';
import { UseKeys } from '../../lib/utils';
import { IModelAction } from '../../client/redux/actions/formulas';
import { logger } from './logger';
import { IModel } from '../../client/redux/reducers/formulas';
import {generate} from 'shortid';
import * as path from 'path';
import {IDirectProblemSolution, IDirectProblemOptions} from '../../lib/common';
const PythonShell = require('python-shell');
import * as _ from 'lodash';
import * as joi from 'joi';

const schemaIDirectProblemSolutionKeys: UseKeys<IDirectProblemSolution, joi.Schema> = {
    solution: joi.array().items(joi.array().items(joi.number())).required()
}
function validateIDirectProblemSolution(obj: any) {
    return validateSchema<IDirectProblemSolution>(obj, joi.object().keys(schemaIDirectProblemSolutionKeys));
}

export class ModelSolver {
    private model: IModel;
    private scriptPath = path.join(__dirname, "solver");
    private script = 'direct_solver.py';

    constructor(model: IModel) {
        this.model = model;
    }

    public solve() {
        return new Promise<IDirectProblemSolution>((resolve, reject) => {
            logger.info('Solving')
            const shell = new PythonShell(this.script, {scriptPath: this.scriptPath});
            const data = {
                model: _.map(this.model, x => x.text),
                initialValues: _.map(this.model, x => x.initialValue),
                interval: 10
            }
            shell.send(JSON.stringify(data));
            shell.on('message', (message: string) => {
                logger.info('message from py');
                console.log(message);
                try {
                    const validator = validateIDirectProblemSolution(JSON.parse(message));
                    if (validator.valid) {
                        resolve(validator.obj);
                    } else {
                        reject(validator.error);
                    }
                } catch (e) {
                    reject(e);
                }
            });
            shell.end(function (err: any) {
                if (err) {
                    reject(err);
                }
                logger.info('finished');
            });
        })
    }
}