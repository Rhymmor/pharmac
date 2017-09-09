import { Action, IAction } from '../';

export interface IUpdateLoadingState extends IAction {
    loading: boolean
}

export const updateLoadingState = (action: string) => (loading: boolean): IUpdateLoadingState => {
    return {type: action, loading};
}

export interface IUpdateParameterNamesAction extends IAction {
    names: string[];
}

export const updateParameterNames = (action: string) => (names: string[]): IUpdateParameterNamesAction => {
    return {type: action, names};
}