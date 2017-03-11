import _ = require('lodash');

export interface IAction {
    type: string;
    error?: boolean;
    meta?: Object;
}

export const Action = {
    UPDATE_DB_CONFIGS_ALL: 'UPDATE_DB_CONFIGS_ALL',

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