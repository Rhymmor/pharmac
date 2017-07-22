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

modelRouter.post("/api/model/direct-problem", directSolveModel);

interface ICreateModelRequest {
    model: IModel;
}

const schemaICreateModelRequestKeys: UseKeys<ICreateModelRequest, joi.Schema> = {
    model: schemaIModel
}
const schemaICreateModelRequest = joi.object().keys(schemaICreateModelRequestKeys);

async function directSolveModel(req: Request, res: Response) {
    const validator = validateSchema<ICreateModelRequest>(req.body, schemaICreateModelRequest);
    if (!validator.valid) {
        res.status(400).json(getValidationError(validator.error));
        return;
    }
    const solver = new ModelSolver(validator.obj.model);
    try {
        const solution = await solver.solve();
        console.log(solution);
        res.status(200).json(solution);
    } catch (e) {
        res.status(400).json({error: e});
    }
}