import { UseKeys } from '../../../lib/utils';
import { Action } from '../actions';
import { IDirectProblemAction } from '../actions/direct-problem';
import * as _ from 'lodash';
import * as joi from 'joi';
import {IDirectProblemSolution, IDirectProblemOptions} from '../../../lib/common';

const defaultOptions: IDirectProblemOptions = {
    interval: 10,
    points: 1000
}
const schemaIDirectProblemOptionsKeys: UseKeys<IDirectProblemOptions, joi.Schema> = {
    interval: joi.number().integer().greater(0).required(),
    points: joi.number().integer().greater(0).required()
}
export const schemaIDirectProblemOptions = joi.object().keys(schemaIDirectProblemOptionsKeys);

const defaultSolution: IDirectProblemSolution = {
    solution: []
}

export interface IDirectProblemStore {
    options: IDirectProblemOptions;
    solution: IDirectProblemSolution;
}

const defaultStore: IDirectProblemStore = {
    options: _.cloneDeep(defaultOptions),
    solution: _.cloneDeep(defaultSolution)
}

export function directProblem(state: IDirectProblemStore = defaultStore, action: IDirectProblemAction) {
    switch (action.type) {
        case Action.UPDATE_DIRECT_PROBLEM_OPTIONS:
            return {...state, options: _.cloneDeep(action.options)};
        case Action.UPDATE_DIRECT_PROBLEM_SOLUTION:
            return {...state, solution: _.cloneDeep(action.solution)};
        default:
            return state;
    }
}