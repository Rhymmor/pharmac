import { IIdentifiabilitySolution } from '../../../../../server/modules/solver/identify-solver';
import { ParametersPlot, PlotType } from '../plots/ParametersPlot';
import * as React from 'react';

interface IProps {
    solution: IIdentifiabilitySolution;
}

interface IState {
}

export class IdentifiabilityPlot extends React.PureComponent<IProps, IState> {
    render() {
        return (
            <ParametersPlot solution={this.props.solution} type={PlotType.bar}/>
        );
    }
}

