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
        NelderMead: translate('problem.inverse.method.NelderMead.name'),
        BFGS: translate('problem.inverse.method.BFGS.name'),
        Powell: translate('problem.inverse.method.Powell.name'),
        CG: translate('problem.inverse.method.CG.name'),
        "L-BFGS-B": translate('problem.inverse.method.L_BFGS_B.name'),
        TNC: translate('problem.inverse.method.TNC.name'),
        COBYLA: translate('problem.inverse.method.COBYLA.name'),
        SLSQP: translate('problem.inverse.method.SLSQP.name'),
    };
};

function getMethodsTooltip(translate: Translate): UseStrings<InverseProblemMethodsType, string> {
    return {
        NelderMead: translate('problem.inverse.method.NelderMead.tooltip'),
        BFGS: translate('problem.inverse.method.BFGS.tooltip'),
        Powell: translate('problem.inverse.method.Powell.tooltip'),
        CG: translate('problem.inverse.method.CG.tooltip'),
        "L-BFGS-B": translate('problem.inverse.method.L_BFGS_B.tooltip'),
        TNC: translate('problem.inverse.method.TNC.tooltip'),
        COBYLA: translate('problem.inverse.method.COBYLA.tooltip'),
        SLSQP: translate('problem.inverse.method.SLSQP.tooltip'),
    }
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
                        tooltips={getMethodsTooltip(translate)}
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
