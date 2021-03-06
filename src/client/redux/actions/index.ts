import _ = require('lodash');

export interface IAction {
    type: string;
    error?: boolean;
    meta?: Object;
}

export enum Action {
    UPDATE_MODEL = 'UPDATE_MODEL',
    UPDATE_MODEL_PARAMETERS = 'UPDATE_MODEL_PARAMETERS',
    UPDATE_MODEL_PARAMETER_NAMES = 'UPDATE_MODEL_PARAMETER_NAMES',
    UPDATE_MODEL_NAME = 'UPDATE_MODEL_NAME',
    UPDATE_DIRECT_PROBLEM_OPTIONS = 'UPDATE_DIRECT_PROBLEM_OPTIONS',
    UPDATE_DIRECT_PROBLEM_SOLUTION = 'UPDATE_DIRECT_PROBLEM_SOLUTION',
    UPDATE_IDENTIFIABILITY_OPTIONS = 'UPDATE_IDENTIFIABILITY_OPTIONS',
    UPDATE_IDENTIFIABILITY_SOLUTION = 'UPDATE_IDENTIFIABILITY_SOLUTION',
    UPDATE_INVERSE_PROBLEM_OPTIONS = 'UPDATE_INVERSE_PROBLEM_OPTIONS',
    UPDATE_INVERSE_PROBLEM_SOLUTION = 'UPDATE_INVERSE_PROBLEM_SOLUTION',
    UPDATE_SYNTHETIC_PARAMETERS = 'UPDATE_SYNTHETIC_PARAMETERS',
    UPDATE_SYNTHETIC_PARAMETER_NAMES = 'UPDATE_SYNTHETIC_PARAMETER_NAMES',
    UPDATE_IP_LOADING_STATE = 'UPDATE_IP_LOADING_STATE',
    UPDATE_IDENT_LOADING_STATE = 'UPDATE_IDENT_LOADING_STATE',
    UPDATE_DP_LOADING_STATE = 'UPDATE_DP_LOADING_STATE'
}

/* Redux actions.
 *
 * They can be dispatched to Redux store by components or any other async handlers/services
 *
 * action function normally returns {type: 'some-action-id', ...props} object,
 * which will be applied immediately to the store using corresponding reducers,
 * but for async stuff we can(this is not mandatory) return functions, which receive dispatch
 * function (almost the same as calling state.dispatch normally).
 *
 * */
export {connect} from 'react-redux';