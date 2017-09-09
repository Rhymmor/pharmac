import { updateParameterNames } from './solvers';
import { IUpdateParameterNamesAction } from './solvers';
import { updateInverseProblemParameterNames, updateInverseProblemParameters } from './solvers/inverse-problem';
import { Action, IAction } from './';
import { IModel, IParameters } from '../reducers/formulas';

export type IModelAction = IUpdateModelAction 
    & IUpdateParametersAction
    & IUpdateParameterNamesAction;

interface IUpdateModelAction extends IAction {
    model: IModel;
}

export function updateModel(newModel: IModel): IUpdateModelAction {
    return {type: Action.UPDATE_MODEL, model: newModel};
}

interface IUpdateParametersAction extends IAction {
    params: IParameters;
}

export function updateModelParameters(params: IParameters): IUpdateParametersAction {
    return {type: Action.UPDATE_MODEL_PARAMETERS, params};
}

export const updateModelParameterNames = updateParameterNames(Action.UPDATE_MODEL_PARAMETER_NAMES);

export function updateAllParameters(params: IParameters) {
    return (dispatch: Function) => {
        dispatch(updateModelParameters(params));
        dispatch(updateInverseProblemParameters(params));
    }
}

export function updateAllParametersNames(names: string[]) {
    return (dispatch: Function) => {
        dispatch(updateModelParameterNames(names));
        dispatch(updateInverseProblemParameterNames(names));
    }
}