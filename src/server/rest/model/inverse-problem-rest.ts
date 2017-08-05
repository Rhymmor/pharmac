import { UseKeys } from '../../../lib/utils';
import { schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import { IValidationResult, validateSchema } from '../../modules/validator';
import { InverseModelSolver } from '../../modules/solver/inverse-solver';
import {
    IInverseProblemOptions,
    schemaIInverseProblemOptionsKeys
} from '../../../client/redux/reducers/solvers/inverse-problem';
import { AbstractModelRest, IModelRequest } from './abstract-model-rest';
import * as joi from 'joi';

export interface IInverseProblemRequest extends IModelRequest<IInverseProblemOptions> {
}

export class InverseProblemRest extends AbstractModelRest<IInverseProblemOptions, IInverseProblemRequest> {
    constructor() {
        super(InverseModelSolver, schemaIInverseProblemOptionsKeys);
    }
}