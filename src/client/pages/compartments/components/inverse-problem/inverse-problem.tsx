import { InverseProblemPlot } from './inverse-problem-plot';
import { AbstractProblem, IProblemProps } from '../abstract-problem';
import * as React from 'react';

interface IInverseProblemProps extends IProblemProps<any, any, any> {
}

interface IInverseProblemState {
}

export class InverseProblem extends React.PureComponent<IInverseProblemProps, IInverseProblemState> {
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
                Plot={InverseProblemPlot as any}
            />
        );
    }
}