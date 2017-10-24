import { StatefulFormControl } from '../../../../components/statefulInput';
import { Dropdown } from '../../../../components/Dropdown';
import { Modifier, Translate } from '../../../../utils/utils';
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
    translate: Translate;
}

interface IState {
}

function getDataSelectionText(translate: Translate): UseStrings<InverseProblemDataSelectionType, string> {
    return {
        Synthetic: translate('problem.inverse.dataSelection.synthetic'),
        Experimental: translate('problem.inverse.dataSelection.experimental'),
    }
};

function getMethodsText(translate: Translate): UseStrings<InverseProblemMethodsType, string> {
    return {
        NelderMead: translate('problem.inverse.method.NelderMead'),
        BFGS: translate('problem.inverse.method.BFGS'),
        Powell: translate('problem.inverse.method.Powell'),
        CG: translate('problem.inverse.method.CG'),
        "L-BFGS-B": translate('problem.inverse.method.L_BFGS_B'),
        TNC: translate('problem.inverse.method.TNC'),
        COBYLA: translate('problem.inverse.method.COBYLA'),
        SLSQP: translate('problem.inverse.method.SLSQP'),
    };
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
        const {options: {method, dataOptions: {dataSelection}}, translate} = this.props;
        return (
            <div>
                <BoxHeader>{translate('problem.inverse.options')}</BoxHeader>
                <div>
                    <Dropdown 
                        value={method}
                        names={getMethodsText(translate)}
                        tooltips={MethodsTooltip}
                        modify={this.modifyMethod}
                        label={`${translate('problem.inverse.method.title')}:`}
                    />
                    <Dropdown 
                        value={dataSelection}
                        names={getDataSelectionText(translate)}
                        modify={this.modifyDataSelection}
                        label={`${translate('problem.inverse.dataSelection.title')}:`}
                    />
                    { dataSelection === InverseProblemDataSelection.Synthetic && this.renderSyntheticPoints()}
                </div>
            </div>
        );
    }
}
