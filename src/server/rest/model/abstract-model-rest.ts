import { ICommonOptions } from '../../../client/redux/reducers/solvers';
import { UseKeys } from '../../../lib/utils';
import { getValidationError } from '../../utils';
import { ISolverConstructor } from '../../modules/solver/abstract-solver';
import { IValidationResult, IValidator, validateSchema } from '../../modules/validator';
import { IModel, IParameters, schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import {Request, Response} from 'express';
import * as joi from 'joi';

export interface IModelRequest<T> {
    model: IModel;
    options: T;
    params: IParameters;
}

export abstract class AbstractModelRest<K extends ICommonOptions, T extends IModelRequest<K>> {
    private solver: ISolverConstructor;
    private schemaOptionsKeys: UseKeys<K, joi.Schema>;

    constructor(solver: ISolverConstructor, schemaOptionsKeys: UseKeys<K, joi.Schema>) {
        this.solver = solver;
        this.schemaOptionsKeys = schemaOptionsKeys;
    }

    protected getRequestSchema() {
        return {
            model: schemaIModel,
            options: joi.object().keys(this.schemaOptionsKeys as any), //Typescript assignment bug
            params: schemaIParameters
        }
    }

    protected validateRequest(obj: any): IValidationResult<T> {
        return validateSchema<T>(obj, this.getRequestSchema());
    }

    solveModel(Solver: ISolverConstructor) {
        return async (req: Request, res: Response) => {
            const validator = this.validateRequest(req.body);
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
}