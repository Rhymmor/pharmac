import { IDirectProblemOptions, IDirectProblemSolution } from '../../../../redux/reducers/solvers/direct-problem';
import { FunctionPlot } from '../plots/FunctionPlot';
import * as React from 'react';

interface IProps {
    solution: IDirectProblemSolution;
    options: IDirectProblemOptions;
    id: string;
}

interface IState {
}

export class DirectProblemPlot extends React.PureComponent<IProps, IState> {
    render() {
        const {solution, options, id} = this.props;
        return (
            <FunctionPlot solution={solution} options={options as any} id={id}/>
        );
    }
}

