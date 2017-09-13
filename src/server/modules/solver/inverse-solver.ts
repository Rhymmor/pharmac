import { validateSchema } from '../validator';
import { UseKeys } from '../../../lib/utils';
import { IModel, IParameters } from '../../../client/redux/reducers/formulas';
import { AbstractModelSolver } from './abstract-solver';
import * as joi from 'joi';
import {
    IInverseProblemOptions,
    IInverseProblemSolution,
    IInverseProblemSolutionParameters,
} from '../../../client/redux/reducers/solvers/inverse-problem';

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
function validateSolution(obj: any) {
    return validateSchema<IInverseProblemSolution>(obj, joi.object().keys(schemaISolutionKeys));
}

export interface IInverseParameters {
    options: IInverseProblemOptions;
    params: IParameters;
}

export class InverseModelSolver extends AbstractModelSolver {
    constructor(model: IModel) {
        //Typescript type bug
        super(model, validateSolution as any, 'inverse_problem.py', 'inverse-problem');
    }

    public solve<IInverseSolution>(params: IInverseParameters) {
        return super.solve<IInverseSolution>(params);
    }
}