import { IUpdateParameterNamesAction, updateParameterNames } from './';
import { IUpdateLoadingState, updateLoadingState } from './';
import { IParameters } from '../../reducers/formulas';
import { IInverseProblemRequest } from '../../../../server/rest/model/inverse-problem-rest';
import {IInverseProblemSolution, IInverseProblemOptions} from '../../reducers/solvers/inverse-problem';
import { Action, IAction } from '../';
import * as request from 'superagent';

export type IInverseProblemAction = IUpdateInverseProblemOptionsAction 
    & IUpdateInverseProblemSolutionAction
    & IUpdateInverseProblemParametersAction
    & IUpdateLoadingState
    & IUpdateParameterNamesAction;

interface IUpdateInverseProblemParametersAction extends IAction {
    params: IParameters;
}

export function updateInverseProblemParameters(params: IParameters): IUpdateInverseProblemParametersAction {
    return {type: Action.UPDATE_SYNTHETIC_PARAMETERS, params};
}

interface IUpdateInverseProblemOptionsAction extends IAction {
    options: IInverseProblemOptions;
}

export function updateInverseProblemOptions(options: IInverseProblemOptions): IUpdateInverseProblemOptionsAction {
    return {type: Action.UPDATE_INVERSE_PROBLEM_OPTIONS, options};
}

interface IUpdateInverseProblemSolutionAction extends IAction {
    solution: IInverseProblemSolution;
}

function updateInverseProblemSolution(solution: IInverseProblemSolution): IUpdateInverseProblemSolutionAction {
    return {type: Action.UPDATE_INVERSE_PROBLEM_SOLUTION, solution};
}

export const updateInverseProblemLoadingState = updateLoadingState(Action.UPDATE_IP_LOADING_STATE);
export const updateInverseProblemParameterNames = updateParameterNames(Action.UPDATE_SYNTHETIC_PARAMETER_NAMES); 

export function getInverseSolution(body: IInverseProblemRequest, callback?: Function) {
    return function (dispatch: Function) {
        request
            .post('/api/model/inverse-problem')
            .send(body)
            .end((err, res) => {
                if (callback) {
                    callback();
                }
                if (!err) {
                    dispatch(updateInverseProblemSolution(res.body));
                } else {
                    //TODO: do smth
                }

            })
    }
}