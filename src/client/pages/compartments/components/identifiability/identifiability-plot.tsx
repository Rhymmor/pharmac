import { ParametersPlot, PlotType } from '../plots/ParametersPlot';
import * as React from 'react';
import { IIdentifiabilitySolution } from '../../../../redux/reducers/solvers/identifiability';

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

