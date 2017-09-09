import { IUpdateLoadingState, updateLoadingState } from './';
import { IIdentifiabilityOptions, IIdentifiabilitySolution } from '../../reducers/solvers/identifiability';
import { IIdentifiabilityRequest } from '../../../../server/rest/model/identifiability-rest';
import { Action, IAction } from '../';
import * as request from 'superagent';

export type IIdentifiabilityAction = IUpdateIdentifiabilityOptionsAction 
    & IUpdateIdentifiabilitySolutionAction
    & IUpdateLoadingState;

interface IUpdateIdentifiabilityOptionsAction extends IAction {
    options: IIdentifiabilityOptions;
}

export function updateIdentifiabilityOptions(options: IIdentifiabilityOptions): IUpdateIdentifiabilityOptionsAction {
    return {type: Action.UPDATE_IDENTIFIABILITY_OPTIONS, options};
}

interface IUpdateIdentifiabilitySolutionAction extends IAction {
    solution: IIdentifiabilitySolution;
}

function updateIdentifiabilitySolution(solution: IIdentifiabilitySolution): IUpdateIdentifiabilitySolutionAction {
    return {type: Action.UPDATE_IDENTIFIABILITY_SOLUTION, solution};
}

export const updateIdentifiabilityLoadingState = updateLoadingState(Action.UPDATE_IDENT_LOADING_STATE);

export function getIdentifiabilitySolution(body: IIdentifiabilityRequest, callback?: Function) {
    return function (dispatch: Function) {
        request
            .post('/api/model/identifiability')
            .send(body)
            .end((err, res) => {
                callback();
                if (!err) {
                    dispatch(updateIdentifiabilitySolution(res.body))
                } else {
                    //TODO: do smth
                }

            })
    }
}