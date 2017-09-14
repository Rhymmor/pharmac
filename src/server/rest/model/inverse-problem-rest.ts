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
        super(InverseModelSolver, schemaIInverseProblemOptionsKeys, modifyBody);
    }
}