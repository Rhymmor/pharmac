import { IModel } from '../../client/redux/reducers/formulas';
import { logger } from '../modules/logger';
import {Router, Request, Response} from 'express';
import {app_router} from './application';
import * as joi from 'joi';

export const modelRouter = Router();


modelRouter.post("/api/model/direct-problem",)

interface ICreateModelRequest {
    model: IModel
}

const schemaICreateModelRequest = joi
function validateICreateModelRequest(obj: any) {

}

function createModel(req: Request, res: Response) {
    
}