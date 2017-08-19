import { AbstractProblem, IProblemProps } from '../abstract-problem';
import { IdentifiabilityPlot } from './identifiability-plot';
import * as React from 'react';

interface IIdentifiabilityProps extends IProblemProps<any, any, any> {
}

interface IIdentifiabilityState {
}

export class IdentifiabilityProblem extends React.PureComponent<IIdentifiabilityProps, IIdentifiabilityState> {
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
                Plot={IdentifiabilityPlot as any}
            />
        );
    }
}