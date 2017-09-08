import { IValidationResult, IValidator, validateSchema } from '../validator';
import { UseKeys } from '../../../lib/utils';
import { logger } from '../../../lib/logger';
import { IModel, IParameters } from '../../../client/redux/reducers/formulas';
import {generate} from 'shortid';
import * as path from 'path';
const PythonShell = require('python-shell');
import * as _ from 'lodash';
import * as joi from 'joi';

interface ISolverParameters {
    options: any;
    params: IParameters;
}

export interface ISolverConstructor {
    new (model: IModel): AbstractModelSolver;
}

export abstract class AbstractModelSolver {
    private model: IModel;
    protected scriptPath = path.join(path.dirname(__dirname), "py-solver");
    private script: string;
    private validator: IValidator;

    constructor(model: IModel, validator: IValidator, script: string, scriptPath?: string) {
        this.model = model;
        this.script = script;
        this.validator = validator;
        if (scriptPath) {
            this.scriptPath = path.join(this.scriptPath, scriptPath);
        }
    }

    public solve<T>(params: ISolverParameters) {
        return new Promise<T>((resolve, reject) => {
            logger.info('Solving')
            const shell = new PythonShell(this.script, {scriptPath: this.scriptPath});
            const data = {
                model: _.map(this.model, x => x.text),
                initialValues: _.map(this.model, x => x.initialValue),
                options: params.options,
                parameters: params.params
            }
            shell.send(JSON.stringify(data));
            shell.on('message', (message: string) => {
                try {
                    const validator = this.validator<T>(JSON.parse(message));
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
            });
        })
    }
}