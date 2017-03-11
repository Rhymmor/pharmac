import { Reducer, combineReducers } from 'redux';

/* Redux reducers
 * Pure functions only which generate new state based on action and previous state
 * nothing else can be used - no ajax/async stuff here.
 * structures are immutable and should not be modified(create new or deepClone and edit)
 * */

export const rootReducer = combineReducers({

});

export interface IStore {

}