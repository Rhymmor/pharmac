import { UseKeys } from '../../../lib/utils';
import * as _ from 'lodash';
import * as joi from 'joi';

export interface IIdentifiabilityOptions {
    interval: number
    points: number
}
const defaultOptions: IIdentifiabilityOptions = {
    interval: 10,
    points: 1000
}
const schemaIIdentifyabilityOptionsKeys: UseKeys<IIdentifiabilityOptions, joi.Schema> = {
    interval: joi.number().integer().greater(0).required(),
    points: joi.number().integer().greater(0).required()
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