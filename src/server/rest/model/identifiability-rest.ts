import { validateSchema, IValidationResult } from '../../modules/validator';
import { schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import { UseKeys, UseStrings } from '../../../lib/utils';
import {
    IIdentifiabilityOptions,
    schemaIIdentifyabilityOptionsKeys,
    IdentifiabilityMethods
} from '../../../client/redux/reducers/solvers/identifiability';
import { AbstractModelRest, IModelRequest, ISolverPostBody } from './abstract-model-rest';
import * as joi from 'joi';

export interface IIdentifiabilitySolution { 
    solution: {[key: string]: number} | number;
} 
const schemaIParametersSolutionKeys: UseKeys<IIdentifiabilitySolution, joi.Schema> = { 
    solution: joi.object().pattern(/^/, joi.number()) 
}
const schemaINumberSolutionKeys: UseKeys<IIdentifiabilitySolution, joi.Schema> = { 
    solution: joi.number().required()
} 

function validateSolution(body: ISolverPostBody<IIdentifiabilityOptions>) {
    return (obj: any): IValidationResult<any> => {
        const schema = body.options.method === IdentifiabilityMethods.Sensitivity
            ? schemaIParametersSolutionKeys
            : schemaINumberSolutionKeys;
        return validateSchema<IIdentifiabilitySolution>(obj, joi.object().keys(schema)); 
    }
} 

export interface IIdentifiabilityRequest extends IModelRequest<IIdentifiabilityOptions> {
}

const PythonMethodNames: UseStrings<IdentifiabilityMethods, string> = {
    Sensitivity: 'sensitivity',
    MonteCarlo: 'monte_carlo'
}

function modifyBody(body: IIdentifiabilityRequest) {
    body.options.method = PythonMethodNames[body.options.method] as any;
}

export class IdentifiabilityRest extends AbstractModelRest<IIdentifiabilityOptions, IIdentifiabilityRequest> {
    constructor() {
        super('/api/identifiability-problem/solve', schemaIIdentifyabilityOptionsKeys, validateSolution, modifyBody);
    }
}