import { IIdentifiabilitySolution } from '../../../../../server/modules/solver/identify-solver';
import { ParametersPlot, PlotType } from '../plots/ParametersPlot';
import * as React from 'react';

interface IProps {
    solution: IIdentifiabilitySolution;
    id: string;
}

interface IState {
}

export class IdentifiabilityPlot extends React.PureComponent<IProps, IState> {
    render() {
        const {solution, id} = this.props;
        return (
            <ParametersPlot solution={solution} type={PlotType.bar} id={id}/>
        );
    }
}

