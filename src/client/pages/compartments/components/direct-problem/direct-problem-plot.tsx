import { IDirectProblemOptions, IDirectProblemSolution } from '../../../../redux/reducers/solvers/direct-problem';
import { FunctionPlot } from '../plots/FunctionPlot';
import * as React from 'react';

interface IProps {
    solution: IDirectProblemSolution;
    options: IDirectProblemOptions;
}

interface IState {
}

export class DirectProblemPlot extends React.PureComponent<IProps, IState> {
    render() {
        const {solution, options} = this.props;
        return (
            <FunctionPlot solution={solution} options={options as any}/>
        );
    }
}

