import { logger } from '../../../lib/logger';
import { Modifier } from '../../../client/utils/utils';
import { ICommonOptions } from '../../../client/redux/reducers/solvers';
import { UseKeys } from '../../../lib/utils';
import { getValidationError } from '../../utils';
import { IValidationResult, IValidator, validateSchema } from '../../modules/validator';
import { IFormula, IModel, IParameters, schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import {Request, Response} from 'express';
import * as joi from 'joi';
import {replace, cloneDeep, mapKeys} from 'lodash';
import * as _ from 'lodash';
import * as request from 'superagent';

const solverPort = process.env.SOLVER_SERVER_PORT || 5555;
const solverUrl = `http://localhost:${solverPort}`;

export interface IModelRequest<T> {
    model: IModel;
    options: T;
    params: IParameters;
}

export interface ISolverPostBody<K extends ICommonOptions> {
    model: string[];
    initialValues: number[];
    options: K;
    parameters: IParameters;
}

export abstract class AbstractModelRest<K extends ICommonOptions, T extends IModelRequest<K>> {
    private url: string;
    private schemaOptionsKeys: UseKeys<K, joi.Schema>;
    private modifyBody: Modifier<T>;
    private responseValidator: (body: ISolverPostBody<K>) => IValidator;

    constructor(
        url: string, 
        schemaOptionsKeys: UseKeys<K, joi.Schema>, 
        responseValidator: (body: ISolverPostBody<K>) => IValidator,
        modifyBody?: Modifier<T>,
    ) {
        this.url = url;
        this.schemaOptionsKeys = schemaOptionsKeys;
        this.responseValidator = responseValidator;
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

    private static prepareText(text: string) {
        return replace(text, /(\{|\})/g, "");
    }

    private static prepareFormula(formula: IFormula) {
        const newFormula = cloneDeep(formula);
        newFormula.text = AbstractModelRest.prepareText(newFormula.text);
        return newFormula;
    }

    private static prepareModel(model: IModel) {
        const newModel = [];
        for (const formula of model) {
            newModel.push(this.prepareFormula(formula));
        }
        return newModel;
    }

    public static prepareParameters(params: IParameters) {
        return mapKeys(params, (val, key) => this.prepareText(key));
    }

    private prepareBody(body: any): ISolverPostBody<K> {
        const validator = this.validateRequest(body);
        if (!validator.valid) {
            logger.error(validator.error.message);
            throw "Validation error: " + validator.error.message
        }
        validator.obj.model = AbstractModelRest.prepareModel(validator.obj.model);
        validator.obj.params = AbstractModelRest.prepareParameters(validator.obj.params);
        if (this.modifyBody) {
            this.modifyBody(validator.obj);
        }
        return {
            model: _.map(validator.obj.model, x => x.text),
            initialValues: _.map(validator.obj.model, x => x.initialValue),
            options: validator.obj.options,
            parameters: validator.obj.params
        };
    }

    solveModel() {
        return async (req: Request, res: Response) => {
            try {
                const body = this.prepareBody(req.body);
                const solutionRes = await request.post(solverUrl + this.url).send(body);
                const validator = this.responseValidator(body)(solutionRes.body);
                if (!validator.valid) {
                    return res.status(400).json({message: `Solution validation error. ${validator.error.message}`})
                }
                return res.status(200).json(validator.obj);
            }
            catch (e) {
                logger.error(e);
                res.status(400).json({message: e});
            }
        }
    }
}