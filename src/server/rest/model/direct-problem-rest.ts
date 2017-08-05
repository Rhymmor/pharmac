import { UseKeys } from '../../../lib/utils';
import { schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import { IValidationResult, validateSchema } from '../../modules/validator';
import { DirectModelSolver } from '../../modules/solver/direct-solver';
import {
    IDirectProblemOptions,
    schemaIDirectProblemOptionsKeys
} from '../../../client/redux/reducers/solvers/direct-problem';
import { AbstractModelRest, IModelRequest } from './abstract-model-rest';
import * as joi from 'joi';

export interface IDirectProblemRequest extends IModelRequest<IDirectProblemOptions> {
}

export class DirectProblemRest extends AbstractModelRest<IDirectProblemOptions, IDirectProblemRequest> {
    constructor() {
        super(DirectModelSolver, schemaIDirectProblemOptionsKeys);
    }
}