import { Action, IAction } from './';
import { IModel } from '../reducers/formulas';

export type IModelAction = IUpdateModelAction;

interface IUpdateModelAction extends IAction {
    model: IModel;
}

export function updateModel(newModel: IModel): IUpdateModelAction {
    return {type: Action.UPDATE_MODEL, model: newModel};
}