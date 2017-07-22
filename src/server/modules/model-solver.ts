import { logger } from './logger';
import { defaults } from './defaults';
import { IModel } from '../../client/redux/reducers/formulas';
import {generate} from 'shortid';
import * as path from 'path';
import * as fs from 'fs-extra';
//import {PythonShell} from 'python-shell';
const PythonShell = require('python-shell');
import * as _ from 'lodash';

const configName = 'model-config-';

export class ModelSolver {
    private model: IModel;
    private configDir: string;

    constructor(model: IModel) {
        this.model = model;
    }

    private async createConfig() {
        this.configDir = path.join(defaults.tmpPath, configName + generate());
        //await fs.writeJson(this.configDir);
    }

    private async deleteConfig() {
        if (await fs.exists(this.configDir)) {
            await fs.remove(this.configDir);
            return true;
        }
        return false;
    }

    public solve() {
        logger.info('Solving')
        const shell = new PythonShell('direct_solver.py', {scriptPath: path.join(__dirname, "solver")});
        const data = {
            model: _.map(this.model, x => x.text),
            initialValues: _.map(this.model, x => x.initialValue),
            interval: 10
        }
        shell.send(JSON.stringify(data));
        shell.on('message', (message: string) => {
            logger.info('message from py')
            console.log(message);
        });
        shell.end(function (err: any) {
            if (err){
                throw err;
            };
            console.log('finished');
        });
    }
}