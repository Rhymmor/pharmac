import { IInverseProblemStore, inverseProblem } from './solvers/inverse-problem';
import { identifiability, IIdentifiabilityStore } from './solvers/identifiability';
import { directProblem, IDirectProblemStore } from './solvers/direct-problem';
import { IModelStore, model } from './formulas';
import { Reducer, combineReducers } from 'redux';
import { localeReducer, LocaleState } from 'react-localize-redux';

export const rootReducer = combineReducers({
    model,
    directProblem,
    identifiability,
    inverseProblem,
    locale: localeReducer
});

export interface IStore {
    model: IModelStore;
    directProblem: IDirectProblemStore;
    identifiability: IIdentifiabilityStore;
    inverseProblem: IInverseProblemStore;
    locale: LocaleState;
}