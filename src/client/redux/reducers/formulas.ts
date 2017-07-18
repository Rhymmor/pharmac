import { Action } from '../actions';
import { IModelAction } from '../actions/formulas';

export interface IFormula {
    id: string;
    text: string;
};
export type IModel = IFormula[];
export type IModelStore = IModel;

export function model(state: IModelStore = [{id: '1', text: '123'}], action: IModelAction) {
    switch (action.type) {
        case Action.UPDATE_MODEL:
            return action.model;
        default:
            return state;
    }
}