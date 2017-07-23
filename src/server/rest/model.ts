import { AbstractModelSolver, ISolverConstructor } from '../modules/solver/abstract-solver';
import { IdentifiabilityModelSolver } from '../modules/solver/identify-solver';
import { schemaIDirectProblemOptions } from '../../client/redux/reducers/direct-problem';
import { IIdentifiabilityOptions, schemaIIdentifiabilityOptions } from '../../client/redux/reducers/identifiability';
import { IDirectProblemOptions } from '../../lib/common';
import { DirectModelSolver } from '../modules/solver/direct-solver';
import { IValidator, validateSchema } from '../modules/validator';
import { UseKeys } from '../../lib/utils';
import { IModel, IParameters, schemaIModel, schemaIParameters } from '../../client/redux/reducers/formulas';
import { logger } from '../modules/logger';
import {Router, Request, Response} from 'express';
import {app_router} from './application';
import * as joi from 'joi';
import * as http from 'http';
import {getValidationError} from '../utils';

export const modelRouter = Router();

modelRouter.post("/api/model/direct-problem", directSolveModel);
modelRouter.post("/api/model/identifiability", identifyModel);

interface IModelRequest<T> {
    model: IModel;
    options: T;
    params: IParameters;
}
function solveModel<T extends IModelRequest<any>>(validate: IValidator, Solver: ISolverConstructor) {
    return async (req: Request, res: Response) => {
        const validator = validate<T>(req.body);
        if (!validator.valid) {
            res.status(400).json(getValidationError(validator.error));
            return;
        }
        const solver = new Solver(validator.obj.model);
        try {
            const solution = await solver.solve({
                params: validator.obj.params,
                options: validator.obj.options
            });
            res.status(200).json(solution);
        } catch (e) {
            res.status(400).json({error: e});
        }
    }
}

export interface IDirectProblemRequest extends IModelRequest<IDirectProblemOptions> {
}
const schemaIDirectProblemRequestKeys: UseKeys<IDirectProblemRequest, joi.Schema> = {
    model: schemaIModel,
    options: schemaIDirectProblemOptions,
    params: schemaIParameters
}
const schemaIDirectProblemRequest = joi.object().keys(schemaIDirectProblemRequestKeys);
const directValidator = (obj: any) => validateSchema<IDirectProblemRequest>(obj, schemaIDirectProblemRequest);
async function directSolveModel(req: Request, res: Response) {
    return solveModel(directValidator, DirectModelSolver)(req, res);
}

export interface IIdentifiabilityRequest extends IModelRequest<IIdentifiabilityOptions> {
}
const schemaIIdentifiabilityRequestKeys: UseKeys<IIdentifiabilityRequest, joi.Schema> = {
    model: schemaIModel,
    options: schemaIIdentifiabilityOptions,
    params: schemaIParameters
}
const schemaIIdentifiabilityRequest = joi.object().keys(schemaIIdentifiabilityRequestKeys);
const identifiabilityValidator = (obj: any) => validateSchema<IIdentifiabilityRequest>(obj, schemaIIdentifiabilityRequest);

async function identifyModel(req: Request, res: Response) {
    return solveModel(identifiabilityValidator, IdentifiabilityModelSolver)(req, res);
}