import { SolutionResults } from '../SolutionResults';
import { ParametersPlot, PlotType } from '../plots/ParametersPlot';
import { updateIdentifiabilityLoadingState } from '../../../../redux/actions/solvers/identifiability';
import { ParametersTable } from '../table/ParametersTable';
import { IParameters } from '../../../../redux/reducers/formulas';
import {
    IIdentifiabilityOptions,
    IIdentifiabilitySolution,
    IIdentifiabilityStore,
} from '../../../../redux/reducers/solvers/identifiability';
import { updateDirectProblemLoadingState } from '../../../../redux/actions/solvers/direct-problem';
import * as classnames from 'classnames';
import { ModelOptions } from '../ModelOptions';
import { Box, BoxHeader } from '../../../../components';
import { IProblemProps } from '../abstract-problem';
import { IdentifiabilityPlot } from './identifiability-plot';
import * as React from 'react';
import { Row, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { ParamsBox } from '../paramsBox';
import * as _ from 'lodash';

interface IIdentifiabilityProps extends IProblemProps<IIdentifiabilitySolution, IIdentifiabilityOptions, IIdentifiabilityStore> {
}

interface IIdentifiabilityState {
}

function isSolveBtnEnable(parameters: IParameters): boolean {
    return !!_.keys(parameters).length;
}

export class IdentifiabilityProblem extends React.PureComponent<IIdentifiabilityProps, IIdentifiabilityState> {

    setLoadingState = (flag: boolean) => this.props.dispatch(updateIdentifiabilityLoadingState(flag));
    finishLoading = () => this.setLoadingState(false);

    solveProblem = () => {
        this.setLoadingState(true);
        this.props.solve(this.finishLoading);
    }

    renderCommonOptions = () => {
        const {problem: {options}, modifyOptions, solve, params} = this.props;
        return (
            <div>
                <BoxHeader>Options</BoxHeader>  
                <div>
                    <ModelOptions 
                        className='inline-block'
                        options={options as any}
                        modifyOptions={modifyOptions as any}
                    />
                    <Button 
                        onClick={this.solveProblem} 
                        className='inline-block' 
                        disabled={!isSolveBtnEnable(params)}
                    >
                        Solve
                    </Button>
                </div>
            </div>
        );
    }

    renderPiePlot = (solution: IIdentifiabilitySolution) => <ParametersPlot solution={solution} type={PlotType.pie}/>

    render() {
        const {solve, problem: {solution, options, loading}, params, modifyParams, modifyOptions} = this.props;
        //Typescript type bug
        return (
            <Box className={classnames('direct-box', loading && 'loading-back')}>
                { loading && <div className='loading-wheel'></div> }
                {this.renderCommonOptions()}
                <Row>
                {
                    !!_.keys(params).length &&
                    <Col xs={12}>
                        <ParamsBox label='Initial parameters' params={params} modifyParams={modifyParams}/>
                    </Col>
                }
                </Row>
                <BoxHeader>Result</BoxHeader>
                <SolutionResults labels={["Bar plot", "Results value table", "Pie plot"]}>
                    <IdentifiabilityPlot solution={solution}/>
                    <ParametersTable parameters={solution.solution}/>
                    {this.renderPiePlot(solution)}
                </SolutionResults>
            </Box>
        );
    }
}