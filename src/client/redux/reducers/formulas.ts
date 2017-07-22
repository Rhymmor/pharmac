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

export type IModel = IFormula[];
const schemaIFormulaKeys: UseKeys<IFormula, joi.Schema> = {
    id: joi.string().required(),
    text: joi.string().required(),
    initialValue: joi.number().required()
}
export const schemaIFormula = joi.object().keys(schemaIFormulaKeys);
export const schemaIModel = joi.array().items(schemaIFormula).required();

export type IModelStore = IModel;

export function model(state: IModelStore = [getDefaultFormula(1)], action: IModelAction) {
    switch (action.type) {
        case Action.UPDATE_MODEL:
            return _.cloneDeep(action.model);
        default:
            return state;
    }
}