import { ParametersPlot, PlotType } from '../plots/ParametersPlot';
import {IInverseProblemSolution} from '../../../../redux/reducers/solvers/inverse-problem';
import * as React from 'react';

interface IProps {
    solution: IInverseProblemSolution;
    id: string;
}

interface IState {
}

export class InverseProblemPlot extends React.PureComponent<IProps, IState> {
    render() {
        const {id, solution} = this.props;
        return (
            <ParametersPlot solution={solution} type={PlotType.bar} id={id}/>
        );
    }
}
