import { UseKeys } from '../../../../lib/utils';
import * as joi from 'joi';

export interface ICommonOptions {
    interval: number
    points: number
}

export const schemaICommonOptionsKeys: UseKeys<ICommonOptions, joi.Schema> = {
    interval: joi.number().integer().greater(0).required(),
    points: joi.number().integer().greater(0).required()
}

export const defaultCommonOptions: ICommonOptions = {
    interval: 10,
    points: 1001
}

export interface ICommonProblemStore<T extends ICommonOptions, K> {
    options: T;
    solution: K;
}

export interface ICommonSolution<T> {
    solution: T
}