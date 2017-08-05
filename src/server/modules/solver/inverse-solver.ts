import { validateSchema } from '../validator';
import { UseKeys } from '../../../lib/utils';
import { IModel, IParameters } from '../../../client/redux/reducers/formulas';
import { AbstractModelSolver } from './abstract-solver';
import * as joi from 'joi';
import { IInverseProblemOptions, IInverseProblemSolution } from '../../../client/redux/reducers/solvers/inverse-problem';

const schemaISolutionKeys: UseKeys<IInverseProblemSolution, joi.Schema> = {
    solution: joi.object().pattern(/^/, joi.number())
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
        super(model, validateSolution, 'inverse_problem.py', 'inverse-problem');
    }

    public solve<IInverseSolution>(params: IInverseParameters) {
        return super.solve<IInverseSolution>(params);
    }
}