import { IUpdateLoadingState, updateLoadingState } from './';
import { IDirectProblemRequest } from '../../../../server/rest/model/direct-problem-rest';
import {IDirectProblemSolution, IDirectProblemOptions} from '../../reducers/solvers/direct-problem';
import { Action, IAction } from '../';
import * as request from 'superagent';

export type IDirectProblemAction = IUpdateDirectProblemOptionsAction 
    & IUpdateDirectProblemSolutionAction
    & IUpdateLoadingState;

interface IUpdateDirectProblemOptionsAction extends IAction {
    options: IDirectProblemOptions;
}

export function updateDirectProblemOptions(options: IDirectProblemOptions): IUpdateDirectProblemOptionsAction {
    return {type: Action.UPDATE_DIRECT_PROBLEM_OPTIONS, options};
}

interface IUpdateDirectProblemSolutionAction extends IAction {
    solution: IDirectProblemSolution;
}

function updateDirectProblemSolution(solution: IDirectProblemSolution): IUpdateDirectProblemSolutionAction {
    return {type: Action.UPDATE_DIRECT_PROBLEM_SOLUTION, solution};
}

export const updateDirectProblemLoadingState = updateLoadingState(Action.UPDATE_DP_LOADING_STATE);

export function getDirectSolution(body: IDirectProblemRequest, callback?: Function) {
    return function (dispatch: Function) {
        request
            .post('/api/model/direct-problem')
            .send(body)
            .end((err, res) => {
                callback();
                if (!err) {
                    dispatch(updateDirectProblemSolution(res.body))
                } else {
                    //TODO: do smth
                }

            })
    }
}