import { identifiability, IIdentifiabilityStore } from './solvers/identifiability';
import { directProblem, IDirectProblemStore } from './solvers/direct-problem';
import { IModelStore, model } from './formulas';
import { Reducer, combineReducers } from 'redux';

/* Redux reducers
 * Pure functions only which generate new state based on action and previous state
 * nothing else can be used - no ajax/async stuff here.
 * structures are immutable and should not be modified(create new or deepClone and edit)
 * */

export const rootReducer = combineReducers({
    model,
    directProblem,
    identifiability
});

export interface IStore {
    model: IModelStore;
    directProblem: IDirectProblemStore;
    identifiability: IIdentifiabilityStore;
}