import { StatefulFormControl } from '../../../../components/statefulInput';
import { Dropdown } from '../../../../components/Dropdown';
import { Modifier } from '../../../../utils/utils';
import { safeGet, UseStrings } from '../../../../../lib/utils';
import { BoxHeader } from '../../../../components/layout';
import * as React from 'react';
import {
    IInverseProblemOptions,
    IInverseProblemSolution,
    IInverseProblemSolutionParameters,
    IInverseProblemStore,
    InverseProblemDataSelection,
    InverseProblemDataSelectionType,
    InverseProblemMethods,
    InverseProblemMethodsType
} from '../../../../redux/reducers/solvers/inverse-problem';

interface IProps {
    options: IInverseProblemOptions;
    modifyOptions: (modify: Modifier<IInverseProblemOptions>) => void;
}

interface IState {
}

const DataSelectionText: UseStrings<InverseProblemDataSelectionType, string> = {
    Synthetic: "Synthetic data",
    Experimental: "Experimental data"
};

const MethodsText: UseStrings<InverseProblemMethodsType, string> = {
    NelderMead: "Nelder-Mead",
    BFGS: "BFGS",
    Powell: "Powell",
    CG: "Conjugate gradient",
    "L-BFGS-B": "L-BFGS-B",
    TNC: "Truncated Newton",
    COBYLA: "COBYLA",
    SLSQP: "SLSQP"
};

const MethodsTooltip: UseStrings<InverseProblemMethodsType, string> = {
    NelderMead: "Nelder-Mead simplex method",
    BFGS: "Broyden–Fletcher–Goldfarb–Shanno algorithm",
    Powell: "Powell's conjugate direction method",
    CG: "Conjugate gradient method",
    "L-BFGS-B": "Limited-memory Broyden–Fletcher–Goldfarb–Shanno algorithm for bound-constrained optimization",
    TNC: "Truncated Newton (TNC) method",
    COBYLA: "Constrained optimization by linear approximation",
    SLSQP: "Sequential quadratic programming"
};

export class InverseProblemOptions extends React.Component<IProps, IState> {
    modifyMethod = (value: InverseProblemMethodsType) => this.props.modifyOptions(options => {
        options.method = value;
    });
    modifyDataSelection = (value: InverseProblemDataSelectionType) => this.props.modifyOptions(options => {
        options.dataOptions.dataSelection = value;
    });
    modifyPoints = (value: number) => this.props.modifyOptions(options => {
        options.dataOptions.dataPoints = value;
    })

    renderSyntheticPoints = () => (
        <div className='inline-block'>
            <span>Number of data points:</span>
            <StatefulFormControl
                className='inline-block direct-problem-input'   //TODO: get classname from props
                value={safeGet(this.props.options, x => x.dataOptions.dataPoints)} 
                parser={Number}
                onSubmit={this.modifyPoints}
            />
        </div>
    );

    render() {
        const {options: {method, dataOptions: {dataSelection}}} = this.props;
        return (
            <div>
                <BoxHeader>Inverse problem options</BoxHeader>
                <div>
                    <Dropdown 
                        value={method}
                        names={MethodsText}
                        tooltips={MethodsTooltip}
                        modify={this.modifyMethod}
                        label='Solution method:'
                    />
                    <Dropdown 
                        value={dataSelection}
                        names={DataSelectionText}
                        modify={this.modifyDataSelection}
                        label='Data selection method:'
                    />
                    { dataSelection === InverseProblemDataSelection.Synthetic && this.renderSyntheticPoints()}
                </div>
            </div>
        );
    }
}
