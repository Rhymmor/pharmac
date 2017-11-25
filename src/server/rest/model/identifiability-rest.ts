import { validateSchema } from '../../modules/validator';
import { IdentifiabilityModelSolver } from '../../modules/solver/identify-solver';
import { schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import { UseKeys, UseStrings } from '../../../lib/utils';
import {
    IIdentifiabilityOptions,
    schemaIIdentifyabilityOptionsKeys,
    IdentifiabilityMethods
} from '../../../client/redux/reducers/solvers/identifiability';
import { AbstractModelRest, IModelRequest } from './abstract-model-rest';
import * as joi from 'joi';

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
        super(IdentifiabilityModelSolver, schemaIIdentifyabilityOptionsKeys, modifyBody);
    }
}