import {
    defaultCommonOptions,
    ICommonOptions,
    ICommonProblemStore,
    ICommonSolution,
    schemaICommonOptionsKeys
} from './';
import { UseKeys } from '../../../../lib/utils';
import { Action } from '../../actions';
import { IDirectProblemAction } from '../../actions/solvers/direct-problem';
import * as _ from 'lodash';
import * as joi from 'joi';

export interface IDirectProblemSolution extends ICommonSolution<number[][]>{
}

export interface IDirectProblemOptions extends ICommonOptions {
}

const defaultOptions: IDirectProblemOptions = {
    ...defaultCommonOptions
}
export const schemaIDirectProblemOptionsKeys: UseKeys<IDirectProblemOptions, joi.Schema> = {
    ...schemaICommonOptionsKeys
}
export const schemaIDirectProblemOptions = joi.object().keys(schemaIDirectProblemOptionsKeys);

const defaultSolution: IDirectProblemSolution = {
    solution: []
}

export interface IDirectProblemStore extends ICommonProblemStore<IDirectProblemOptions, IDirectProblemSolution> {
}

const defaultStore: IDirectProblemStore = {
    options: _.cloneDeep(defaultOptions),
    solution: _.cloneDeep(defaultSolution),
    loading: false
}

export function directProblem(state: IDirectProblemStore = defaultStore, action: IDirectProblemAction) {
    switch (action.type) {
        case Action.UPDATE_DIRECT_PROBLEM_OPTIONS:
            return {...state, options: _.cloneDeep(action.options)};
        case Action.UPDATE_DIRECT_PROBLEM_SOLUTION:
            return {...state, solution: _.cloneDeep(action.solution)};
        case Action.UPDATE_DP_LOADING_STATE:
            return {...state, loading: action.loading}
        default:
            return state;
    }
}