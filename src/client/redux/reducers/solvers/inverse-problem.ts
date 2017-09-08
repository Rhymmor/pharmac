import { validateSchema } from '../../../../server/modules/validator';
import { IParameters } from '../formulas';
import {
    defaultCommonOptions,
    ICommonOptions,
    ICommonProblemStore,
    ICommonSolution,
    schemaICommonOptionsKeys
} from './';
import { Enum, UseKeys, UseStrings } from '../../../../lib/utils';
import { Action } from '../../actions';
import { IInverseProblemAction } from '../../actions/inverse-problem';
import * as _ from 'lodash';
import * as joi from 'joi';

export interface IInverseProblemSolution extends ICommonSolution<IParameters> {
}

export type InverseProblemMethodsType = "NelderMead";
export const InverseProblemMethods: Readonly<Enum<InverseProblemMethodsType>> = {
    NelderMead: "NelderMead"
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
    solution: {}
}

export interface IInverseProblemStore extends ICommonProblemStore<IInverseProblemOptions, IInverseProblemSolution> {
}

const defaultStore: IInverseProblemStore = {
    options: _.cloneDeep(defaultOptions),
    solution: _.cloneDeep(defaultSolution)
}

export function inverseProblem(state: IInverseProblemStore = defaultStore, action: IInverseProblemAction) {
    switch (action.type) {
        case Action.UPDATE_INVERSE_PROBLEM_OPTIONS:
            return {...state, options: _.cloneDeep(action.options)};
        case Action.UPDATE_INVERSE_PROBLEM_SOLUTION:
            return {...state, solution: _.cloneDeep(action.solution)};
        case Action.UPDATE_SYNTHETIC_PARAMETERS:
            return {...state, options: {...state.options, syntheticParameters: _.cloneDeep(action.params)}};
        default:
            return state;
    }
}