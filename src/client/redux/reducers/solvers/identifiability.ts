import { ICommonOptions, defaultCommonOptions, schemaICommonOptionsKeys } from './';
import { IIdentifiabilityAction } from '../../actions/identifiability';
import { UseKeys } from '../../../../lib/utils';
import * as _ from 'lodash';
import * as joi from 'joi';
import { Action } from '../../actions';

export interface IIdentifiabilityOptions extends ICommonOptions {
}
const defaultOptions: IIdentifiabilityOptions = {
    ...defaultCommonOptions
}
export const schemaIIdentifyabilityOptionsKeys: UseKeys<IIdentifiabilityOptions, joi.Schema> = {
    ...schemaICommonOptionsKeys
}
export const schemaIIdentifiabilityOptions = joi.object().keys(schemaIIdentifyabilityOptionsKeys);

export interface IIdentifiabilitySolution {
    solution: {[key: string]: number}
}

const defaultSolution: IIdentifiabilitySolution = {
    solution: {}
}

export interface IIdentifiabilityStore {
    options: IIdentifiabilityOptions;
    solution: IIdentifiabilitySolution;
}

const defaultStore: IIdentifiabilityStore = {
    options: _.cloneDeep(defaultOptions),
    solution: _.cloneDeep(defaultSolution)
}

export function identifiability(state: IIdentifiabilityStore = defaultStore, action: IIdentifiabilityAction) {
    switch (action.type) {
        case Action.UPDATE_IDENTIFIABILITY_OPTIONS:
            return {...state, options: _.cloneDeep(action.options)};
        case Action.UPDATE_IDENTIFIABILITY_SOLUTION:
            return {...state, solution: _.cloneDeep(action.solution)};
        default:
            return state;
    }
}