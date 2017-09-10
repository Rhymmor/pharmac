import { UseKeys, UseStrings } from '../../../lib/utils';
import { schemaIModel, schemaIParameters } from '../../../client/redux/reducers/formulas';
import { IValidationResult, validateSchema } from '../../modules/validator';
import { InverseModelSolver } from '../../modules/solver/inverse-solver';
import {
    IInverseProblemOptions,
    InverseProblemDataSelection,
    InverseProblemMethodsType,
    schemaIInverseProblemOptionsKeys
} from '../../../client/redux/reducers/solvers/inverse-problem';
import { AbstractModelRest, IModelRequest } from './abstract-model-rest';
import * as joi from 'joi';

export interface IInverseProblemRequest extends IModelRequest<IInverseProblemOptions> {
}

const PythonMethodNames: UseStrings<InverseProblemMethodsType, string> = {
    NelderMead: 'nelder-mead',
    BFGS: 'BFGS',
    Powell: "Powell"
}

function modifyBody(body: IInverseProblemRequest) {
    body.options.method = PythonMethodNames[body.options.method] as any;
    if (body.options.dataSelection === InverseProblemDataSelection.Synthetic) {
        body.options.data = undefined;
    } else if (body.options.dataSelection === InverseProblemDataSelection.Experimental) {
        body.options.syntheticParameters = undefined;
    }
}

export class InverseProblemRest extends AbstractModelRest<IInverseProblemOptions, IInverseProblemRequest> {
    constructor() {
        super(InverseModelSolver, schemaIInverseProblemOptionsKeys, modifyBody);
    }
}