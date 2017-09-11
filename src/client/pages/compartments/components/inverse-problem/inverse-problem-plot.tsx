import { ParametersPlot, PlotType } from '../plots/ParametersPlot';
import {IInverseProblemSolution} from '../../../../redux/reducers/solvers/inverse-problem';
import * as React from 'react';

interface IProps {
    solution: IInverseProblemSolution;
}

interface IState {
}

export class InverseProblemPlot extends React.PureComponent<IProps, IState> {
    render() {
        return (
            <ParametersPlot solution={this.props.solution} type={PlotType.bar}/>
        );
    }
}
