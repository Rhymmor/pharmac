import { updateInverseProblemParameters } from './inverse-problem';
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

export function updateModelParameters(params: IParameters): IUpdateParametersAction {
    return {type: Action.UPDATE_MODEL_PARAMETERS, params};
}

export function updateAllParameters(params: IParameters) {
    return (dispatch: Function) => {
        dispatch(updateModelParameters(params));
        dispatch(updateInverseProblemParameters(params));
    }
}