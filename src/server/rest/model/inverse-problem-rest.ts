import { UseKeys, UseStrings } from '../../../lib/utils';
import { schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import { IValidationResult, validateSchema } from '../../modules/validator';
import {
    IInverseProblemOptions,
    InverseProblemDataSelection,
    InverseProblemMethodsType,
    schemaIInverseProblemOptionsKeys,
    IInverseProblemSolutionParameters,
    IInverseProblemSolution
} from '../../../client/redux/reducers/solvers/inverse-problem';
import { AbstractModelRest, IModelRequest } from './abstract-model-rest';
import * as joi from 'joi';

const schemaISolutionParametersKeys: UseKeys<IInverseProblemSolutionParameters, joi.Schema> = { 
    nfev: joi.number().required(), 
    nit: joi.number().required().allow(null), 
    fun: joi.number().required(), 
    time: joi.number().required() 
} 
 
const schemaISolutionKeys: UseKeys<IInverseProblemSolution, joi.Schema> = { 
    solution: joi.object().pattern(/^/, joi.number()), 
    parameters: joi.object().keys(schemaISolutionParametersKeys) 
} 
function validateSolution(obj: any): IValidationResult<any> { 
    return validateSchema<IInverseProblemSolution>(obj, joi.object().keys(schemaISolutionKeys)); 
} 

export interface IInverseProblemRequest extends IModelRequest<IInverseProblemOptions> {
}

const PythonMethodNames: UseStrings<InverseProblemMethodsType, string> = {
    NelderMead: 'nelder-mead',
    BFGS: 'BFGS',
    "L-BFGS-B": "L-BFGS-B",
    Powell: "Powell",
    CG: "CG",
    TNC: "TNC",
    COBYLA: "COBYLA",
    SLSQP: "SLSQP"
}

function modifyBody(body: IInverseProblemRequest) {
    const {dataOptions, syntheticParameters, method} = body.options;
    body.options.method = PythonMethodNames[method] as any;
    if (dataOptions.dataSelection === InverseProblemDataSelection.Synthetic) {
        dataOptions.data = undefined;
        body.options.syntheticParameters = AbstractModelRest.prepareParameters(syntheticParameters);
    } else if (dataOptions.dataSelection === InverseProblemDataSelection.Experimental) {
        body.options.syntheticParameters = undefined;
        dataOptions.dataPoints = undefined;
    }
}

export class InverseProblemRest extends AbstractModelRest<IInverseProblemOptions, IInverseProblemRequest> {
    constructor() {
        super('/api/inverse-problem/solve', schemaIInverseProblemOptionsKeys, validateSolution, modifyBody);
    }
}