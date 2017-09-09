import { updateParameterNames } from './solvers';
import { IUpdateParameterNamesAction } from './solvers';
import { updateInverseProblemParameterNames, updateInverseProblemParameters } from './solvers/inverse-problem';
import { Action, IAction } from './';
import { IModel, IParameters } from '../reducers/formulas';
import * as _ from 'lodash';

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

const FUNCTION_REGEX = /x_\{[0-9]+\}/;
const isFunctionSymbol = (str: string) => FUNCTION_REGEX.test(str);
const PARAMETER_REGEX = /[a-zA-Z]+[_\{\}0-9]*/g;    //TODO: change to more reliable method
const isParameter = (str: string) => !Number(str) && !isFunctionSymbol(str);


function findParameters(formula: string) {
    return _.filter(formula.match(PARAMETER_REGEX), isParameter);
}

function checkParameters(model: IModel) {
    return _.flatten(_.map(model, (formula) => findParameters(formula.text)));
}

export function checkAndUpdateModel(newModel: IModel) {
    return (dispatch: Function) => {
        dispatch(updateModel(newModel));
        dispatch(updateAllParametersNames(checkParameters(newModel)));
    }
}