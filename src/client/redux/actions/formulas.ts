import { Action, IAction } from './';
import { IModel, IParameters } from '../reducers/formulas';

export type IModelAction = IUpdateModelAction & IUpdateParametersAction;

interface IUpdateModelAction extends IAction {
    model: IModel;
}

export function updateModel(newModel: IModel): IUpdateModelAction {
    return {type: Action.UPDATE_MODEL, model: newModel};
}

interface IUpdateParametersAction extends IAction {
    params: IParameters;
}

export function updateParameters(params: IParameters): IUpdateParametersAction {
    return {type: Action.UPDATE_PARAMETERS, params};
}