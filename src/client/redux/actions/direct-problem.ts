import { IDirectProblemRequest } from '../../../server/rest/model';
import {IDirectProblemSolution, IDirectProblemOptions} from '../../../lib/common';
import { Action, IAction } from './';
import * as request from 'superagent';

export type IDirectProblemAction = IUpdateDirectProblemOptionsAction & IUpdateDirectProblemSolutionAction;

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

export function getDirectSolution(body: IDirectProblemRequest) {
    return function (dispatch: Function) {
        request
            .post('/api/model/direct-problem')
            .send(body)
            .end((err, res) => {
                if (!err) {
                    dispatch(updateDirectProblemSolution(res.body))
                } else {
                    //TODO: do smth
                }

            })
    }
}