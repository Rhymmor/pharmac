import { AbstractModelSolver } from './abstract-solver';
import { IValidationResult, validateSchema } from '../validator';
import { UseKeys } from '../../../lib/utils';
import { IModel, IParameters } from '../../../client/redux/reducers/formulas';
import { IDirectProblemSolution, IDirectProblemOptions } from '../../../client/redux/reducers/solvers/direct-problem';
import * as joi from 'joi';

const schemaIDirectProblemSolutionKeys: UseKeys<IDirectProblemSolution, joi.Schema> = {
    solution: joi.array().items(joi.array().items(joi.number())).required()
}
function validateIDirectProblemSolution(obj: any): IValidationResult<any> {
    return validateSchema<IDirectProblemSolution>(obj, joi.object().keys(schemaIDirectProblemSolutionKeys));
}

export interface IDirectSolverParameters {
    options: IDirectProblemOptions;
    params: IParameters;
}

export class DirectModelSolver extends AbstractModelSolver {
    constructor(model: IModel) {
        super(model, validateIDirectProblemSolution, 'direct_solver.py');
    }

    public solve<IDirectProblemSolution>(params: IDirectSolverParameters) {
        return super.solve<IDirectProblemSolution>(params);
    }
}