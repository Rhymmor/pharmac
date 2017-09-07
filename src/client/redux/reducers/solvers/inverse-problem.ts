import {
    defaultCommonOptions,
    ICommonOptions,
    ICommonProblemStore,
    ICommonSolution,
    schemaICommonOptionsKeys
} from './';
import { UseKeys } from '../../../../lib/utils';
import { Action } from '../../actions';
import { IInverseProblemAction } from '../../actions/inverse-problem';
import * as _ from 'lodash';
import * as joi from 'joi';

export interface IInverseProblemSolution extends ICommonSolution<{[key: string]: number}> {
}

export interface IInverseProblemOptions extends ICommonOptions {
}

const defaultOptions: IInverseProblemOptions = {
    ...defaultCommonOptions
}
export const schemaIInverseProblemOptionsKeys: UseKeys<IInverseProblemOptions, joi.Schema> = {
    ...schemaICommonOptionsKeys
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
        default:
            return state;
    }
}