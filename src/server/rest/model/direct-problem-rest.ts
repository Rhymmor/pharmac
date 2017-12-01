import { UseKeys } from '../../../lib/utils';
import { schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import { IValidationResult, validateSchema } from '../../modules/validator';
import {
    IDirectProblemOptions,
    schemaIDirectProblemOptionsKeys,
    IDirectProblemSolution
} from '../../../client/redux/reducers/solvers/direct-problem';
import { AbstractModelRest, IModelRequest } from './abstract-model-rest';
import * as joi from 'joi';

const schemaIDirectProblemSolutionKeys: UseKeys<IDirectProblemSolution, joi.Schema> = { 
    solution: joi.array().items(joi.array().items(joi.number())).required() 
} 
function validateIDirectProblemSolution() {
    return (obj: any): IValidationResult<any> => { 
        return validateSchema<IDirectProblemSolution>(obj, joi.object().keys(schemaIDirectProblemSolutionKeys)); 
    } 
}

export interface IDirectProblemRequest extends IModelRequest<IDirectProblemOptions> {
}

export class DirectProblemRest extends AbstractModelRest<IDirectProblemOptions, IDirectProblemRequest> {
    constructor() {
        super('/api/direct-problem/solve', schemaIDirectProblemOptionsKeys, validateIDirectProblemSolution);
    }
}