import { AbstractProblem, IProblemProps } from '../abstract-problem';
import { DirectProblemPlot } from './direct-problem-plot';
import * as React from 'react';

interface IDirectProblemProps extends IProblemProps<any, any, any> {
}

interface IDirectProblemState {
}

export class DirectProblem extends React.PureComponent<IDirectProblemProps, IDirectProblemState> {
    render() {
        const {solve, problem, params, modifyParams, modifyOptions} = this.props;
        //Typescript type bug
        return (
            <AbstractProblem
                solve={solve}
                params={params}
                modifyParams={modifyParams}
                modifyOptions={modifyOptions}
                problem={problem}
                Plot={DirectProblemPlot as any}
            />
        );
    }
}