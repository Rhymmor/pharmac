import { logger } from '../../../lib/logger';
import { Modifier } from '../../../client/utils/utils';
import { ICommonOptions } from '../../../client/redux/reducers/solvers';
import { UseKeys } from '../../../lib/utils';
import { getValidationError } from '../../utils';
import { ISolverConstructor } from '../../modules/solver/abstract-solver';
import { IValidationResult, IValidator, validateSchema } from '../../modules/validator';
import { IFormula, IModel, IParameters, schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import {Request, Response} from 'express';
import * as joi from 'joi';
import {replace, cloneDeep} from 'lodash';

export interface IModelRequest<T> {
    model: IModel;
    options: T;
    params: IParameters;
}

export abstract class AbstractModelRest<K extends ICommonOptions, T extends IModelRequest<K>> {
    private Solver: ISolverConstructor;
    private schemaOptionsKeys: UseKeys<K, joi.Schema>;
    private modifyBody: Modifier<T>;

    constructor(Solver: ISolverConstructor, schemaOptionsKeys: UseKeys<K, joi.Schema>, modifyBody?: Modifier<T>) {
        this.Solver = Solver;
        this.schemaOptionsKeys = schemaOptionsKeys;
        if (modifyBody) {
            this.modifyBody = modifyBody;
        }
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

    private prepareFormula(formula: IFormula) {
        const newFormula = cloneDeep(formula);
        newFormula.text = replace(formula.text, /(\{|\})/g, "");
        return newFormula;
    }

    private prepareModel(model: IModel) {
        const newModel = [];
        for (const formula of model) {
            newModel.push(this.prepareFormula(formula));
        }
        return newModel;
    }

    solveModel() {
        return async (req: Request, res: Response) => {
            const validator = this.validateRequest(req.body);
            validator.obj.model = this.prepareModel(validator.obj.model);
            if (this.modifyBody) {
                this.modifyBody(validator.obj);
            }
            if (!validator.valid) {
                logger.error(validator.error.message);
                res.status(400).json(getValidationError(validator.error));
                return;
            }
            const solver = new this.Solver(validator.obj.model);
            try {
                const solution = await solver.solve({
                    params: validator.obj.params,
                    options: validator.obj.options
                });
                res.status(200).json(solution);
            } catch (e) {
                logger.error(e);
                res.status(400).json({error: e});
            }
        }
    }
}