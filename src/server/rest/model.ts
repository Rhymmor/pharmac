import { ModelSolver } from '../modules/model-solver';
import { validateSchema } from '../modules/validator';
import { UseKeys } from '../../lib/utils';
import { IModel, schemaIModel } from '../../client/redux/reducers/formulas';
import { logger } from '../modules/logger';
import {Router, Request, Response} from 'express';
import {app_router} from './application';
import * as joi from 'joi';
import * as http from 'http';
import {getValidationError} from '../utils';

export const modelRouter = Router();

modelRouter.post("/api/model/direct-problem", createModel);

interface ICreateModelRequest {
    model: IModel;
}

const schemaICreateModelRequestKeys: UseKeys<ICreateModelRequest, joi.Schema> = {
    model: schemaIModel
}
const schemaICreateModelRequest = joi.object().keys(schemaICreateModelRequestKeys);

function createModel(req: Request, res: Response) {
    const validator = validateSchema<ICreateModelRequest>(req.body, schemaICreateModelRequest);
    if (!validator.valid) {
        res.status(400).json({error: getValidationError(validator.error)});
        return;
    }
    const solver = new ModelSolver(validator.obj.model);
    solver.solve();
    res.status(200);
}