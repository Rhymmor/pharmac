import { validateSchema } from '../../modules/validator';
import { IdentifiabilityModelSolver } from '../../modules/solver/identify-solver';
import { schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import { UseKeys } from '../../../lib/utils';
import {
    IIdentifiabilityOptions,
    schemaIIdentifyabilityOptionsKeys
} from '../../../client/redux/reducers/solvers/identifiability';
import { AbstractModelRest, IModelRequest } from './abstract-model-rest';
import * as joi from 'joi';

export interface IIdentifiabilityRequest extends IModelRequest<IIdentifiabilityOptions> {
}

export class IdentifiabilityRest extends AbstractModelRest<IIdentifiabilityOptions, IIdentifiabilityRequest> {
    constructor() {
        super(IdentifiabilityModelSolver, schemaIIdentifyabilityOptionsKeys);
    }
}