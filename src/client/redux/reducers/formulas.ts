import { getDefaultFormula } from '../../utils/formula-utils';
import { Action } from '../actions';
import { IModelAction } from '../actions/formulas';

export interface IFormula {
    id: string;
    text: string;
    initialValue: number;
};

export type IModel = IFormula[];
export type IModelStore = IModel;

export function model(state: IModelStore = [getDefaultFormula(1)], action: IModelAction) {
    switch (action.type) {
        case Action.UPDATE_MODEL:
            return action.model;
        default:
            return state;
    }
}