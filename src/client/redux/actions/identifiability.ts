import { IIdentifiabilityOptions, IIdentifiabilitySolution } from '../reducers/solvers/identifiability';
import { IIdentifiabilityRequest } from '../../../server/rest/model/identifiability-rest';
import { Action, IAction } from './';
import * as request from 'superagent';

export type IIdentifiabilityAction = IUpdateIdentifiabilityOptionsAction & IUpdateIdentifiabilitySolutionAction;

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

export function getIdentifiabilitySolution(body: IIdentifiabilityRequest) {
    return function (dispatch: Function) {
        request
            .post('/api/model/identifiability')
            .send(body)
            .end((err, res) => {
                if (!err) {
                    dispatch(updateIdentifiabilitySolution(res.body))
                } else {
                    //TODO: do smth
                }

            })
    }
}