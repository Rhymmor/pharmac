import { UseKeys } from '../../../lib/utils';
import { getDefaultFormula } from '../../utils/formula-utils';
import { Action } from '../actions';
import { IModelAction } from '../actions/formulas';
import * as joi from 'joi';
import * as _ from 'lodash';

export interface IFormula {
    id: string;
    text: string;
    initialValue: number;
};
const schemaIFormulaKeys: UseKeys<IFormula, joi.Schema> = {
    id: joi.string().required(),
    text: joi.string().required(),
    initialValue: joi.number().required()
}
export const schemaIFormula = joi.object().keys(schemaIFormulaKeys);

export type IModel = IFormula[];
export const schemaIModel = joi.array().items(schemaIFormula).required();

export type IParameters = {[key: string]: number};
export const schemaIParameters = joi.object().pattern(/^/, joi.number())

export type IModelStore = {
    model: IModel,
    parameters: IParameters
};

const defaultModelStore: IModelStore = {
    model: [getDefaultFormula(1)],
    parameters: {}
}

export function model(state: IModelStore = defaultModelStore, action: IModelAction) {
    switch (action.type) {
        case Action.UPDATE_MODEL:
            return {...state, model: _.cloneDeep(action.model)};
        case Action.UPDATE_PARAMETERS:
            return {...state, parameters: _.cloneDeep(action.params)};
        default:
            return state;
    }
}