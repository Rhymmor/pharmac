import { validateSchema } from '../../../../server/modules/validator';
import { getModelParameters, IParameters } from '../formulas';
import {
    defaultCommonOptions,
    ICommonOptions,
    ICommonProblemStore,
    ICommonSolution,
    schemaICommonOptionsKeys
} from './';
import { Enum, UseKeys, UseStrings } from '../../../../lib/utils';
import { Action } from '../../actions';
import { IInverseProblemAction } from '../../actions/solvers/inverse-problem';
import * as _ from 'lodash';
import * as joi from 'joi';

export interface IInverseProblemSolutionParameters {
    fun: number     // Values of objective function
    nfev: number;   // Number of evaluations of the objective functions
    nit?: number;   // Number of iterations
    time: number;   // Execution time (seconds)
}

export interface IInverseProblemSolution extends ICommonSolution<IParameters> {
    parameters: IInverseProblemSolutionParameters;
}

export type InverseProblemMethodsType = "NelderMead" | "BFGS" | "L-BFGS-B" | "Powell"
                                         | "CG" | "TNC" | "COBYLA" | "SLSQP";
export const InverseProblemMethods: Readonly<Enum<InverseProblemMethodsType>> = {
    NelderMead: "NelderMead",
    BFGS: "BFGS",
    Powell: "Powell",
    CG: "CG",
    "L-BFGS-B": "L-BFGS-B",
    TNC: "TNC",
    COBYLA: "COBYLA",
    SLSQP: "SLSQP"
}

export type InverseProblemDataSelectionType = "Synthetic" | "Experimental";
export const InverseProblemDataSelection: Readonly<Enum<InverseProblemDataSelectionType>> = {
    Synthetic: "Synthetic",
    Experimental: "Experimental",
}

interface IDataPoint {
    time: number;
    value: number[];
}
export type InverseProblemData = IDataPoint[];
const schemaIIDataPointKeys: UseKeys<IDataPoint, joi.Schema> = {
    time: joi.number().required(),
    value: joi.array().items(joi.number()).required()
}
const schemaInverseProblemData = joi.array().items(joi.object().keys(schemaIIDataPointKeys));
export function validateInverseProblemData(obj: any) {
    return validateSchema<InverseProblemData>(obj, schemaInverseProblemData);
}

export interface IInverseProblemOptions extends ICommonOptions {
    syntheticParameters?: IParameters;
    method: InverseProblemMethodsType;
    dataSelection: InverseProblemDataSelectionType;
    data?: InverseProblemData;
}

const defaultOptions: IInverseProblemOptions = {
    ...defaultCommonOptions,
    method: InverseProblemMethods.NelderMead,
    dataSelection: InverseProblemDataSelection.Synthetic
}


export const schemaIInverseProblemOptionsKeys: UseKeys<IInverseProblemOptions, joi.Schema> = {
    ...schemaICommonOptionsKeys,
    syntheticParameters: joi.object().pattern(/^/, joi.number()).optional(),
    method: joi.string().allow(_.values(InverseProblemMethods)),
    dataSelection: joi.string().allow(_.values(InverseProblemDataSelection)),
    data: schemaInverseProblemData
}
export const schemaIInverseProblemOptions = joi.object().keys(schemaIInverseProblemOptionsKeys);

const defaultSolution: IInverseProblemSolution = {
    solution: {},
    parameters: {
        fun: undefined,
        nfev: undefined,
        nit: undefined,
        time: undefined
    }
}

export interface IInverseProblemStore extends ICommonProblemStore<IInverseProblemOptions, IInverseProblemSolution> {
}

const defaultStore: IInverseProblemStore = {
    options: _.cloneDeep(defaultOptions),
    solution: _.cloneDeep(defaultSolution),
    loading: false
}

export function inverseProblem(state: IInverseProblemStore = defaultStore, action: IInverseProblemAction): IInverseProblemStore {
    switch (action.type) {
        case Action.UPDATE_INVERSE_PROBLEM_OPTIONS:
            return {...state, options: _.cloneDeep(action.options)};
        case Action.UPDATE_INVERSE_PROBLEM_SOLUTION:
            return {...state, solution: _.cloneDeep(action.solution)};
        case Action.UPDATE_SYNTHETIC_PARAMETERS:
            return {...state, options: {...state.options, syntheticParameters: _.cloneDeep(action.params)}};
        case Action.UPDATE_IP_LOADING_STATE:
            return {...state, loading: action.loading}
        case Action.UPDATE_SYNTHETIC_PARAMETER_NAMES:
            const parameters = getModelParameters(state.options.syntheticParameters || {}, action.names);
            return {
                ...state, 
                options: {
                    ...state.options, 
                    syntheticParameters: parameters
                }
            };
        default:
            return state;
    }
}