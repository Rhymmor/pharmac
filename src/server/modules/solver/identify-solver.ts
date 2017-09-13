import { IIdentifiabilityOptions } from '../../../client/redux/reducers/solvers/identifiability';
import { IValidationResult, validateSchema } from '../validator';
import { UseKeys } from '../../../lib/utils';
import { IModel, IParameters } from '../../../client/redux/reducers/formulas';
import { AbstractModelSolver } from './abstract-solver';
import * as joi from 'joi';

export interface IIdentifiabilitySolution {
    solution: {[key: string]: number}
}
const schemaISolutionKeys: UseKeys<IIdentifiabilitySolution, joi.Schema> = {
    solution: joi.object().pattern(/^/, joi.number())
}
function validateSolution(obj: any): IValidationResult<any> {
    return validateSchema<IIdentifiabilitySolution>(obj, joi.object().keys(schemaISolutionKeys));
}

export interface IIdentifiabilityParameters {
    options: IIdentifiabilityOptions;
    params: IParameters;
}

export class IdentifiabilityModelSolver extends AbstractModelSolver {
    constructor(model: IModel) {
        super(model, validateSolution, 'sensitivity.py', 'identifiability');
    }

    public solve<IIdentifiabilitySolution>(params: IIdentifiabilityParameters) {
        return super.solve<IIdentifiabilitySolution>(params);
    }
}