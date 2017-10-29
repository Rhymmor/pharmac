import { ResultCard } from '../result-cards/ResultCard';
import { connectLocale, WithLocale } from '../../../../components/connectLocale';
import { SolutionResults } from '../SolutionResults';
import { ParametersPlot, PlotType } from '../plots/ParametersPlot';
import { updateIdentifiabilityLoadingState } from '../../../../redux/actions/solvers/identifiability';
import { KeyValueTable } from '../table/KeyValueTable';
import { IParameters } from '../../../../redux/reducers/formulas';
import {
    IIdentifiabilityOptions,
    IIdentifiabilitySolution,
    IIdentifiabilityStore,
} from '../../../../redux/reducers/solvers/identifiability';
import { updateDirectProblemLoadingState } from '../../../../redux/actions/solvers/direct-problem';
import * as classnames from 'classnames';
import ModelOptions from '../ModelOptions';
import { Box, BoxHeader } from '../../../../components';
import { IProblemProps } from '../abstract-problem';
import { IdentifiabilityPlot } from './identifiability-plot';
import * as React from 'react';
import { Row, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { ParamsBox } from '../paramsBox';
import * as _ from 'lodash';

interface IIdentifiabilityProps extends IProblemProps<
    IIdentifiabilitySolution, 
    IIdentifiabilityOptions, 
    IIdentifiabilityStore
>, WithLocale {}

interface IIdentifiabilityState {
}

function isSolveBtnEnable(parameters: IParameters): boolean {
    return !!_.keys(parameters).length;
}

class IdentifiabilityProblem extends React.PureComponent<IIdentifiabilityProps, IIdentifiabilityState> {

    setLoadingState = (flag: boolean) => this.props.dispatch(updateIdentifiabilityLoadingState(flag));
    finishLoading = () => this.setLoadingState(false);

    solveProblem = () => {
        this.setLoadingState(true);
        this.props.solve(this.finishLoading);
    }

    private getResultLabels = () => {
        const {translate} = this.props;
        return [
            translate('problem.identifiability.barChart'),
            translate('problem.identifiability.resultTable'),
            translate('problem.identifiability.pieChart')
        ];
    }

    renderPiePlot = (solution: IIdentifiabilitySolution) => <ParametersPlot solution={solution} type={PlotType.pie}/>

    render() {
        const {solve, translate, problem: {solution, options, loading}, params, modifyParams, modifyOptions} = this.props;
        //Typescript type bug
        return (
            <Box className={classnames('direct-box', loading && 'loading-back')}>
                { loading && <div className='loading-wheel'></div> }
                <ModelOptions 
                    options={options as any} 
                    modifyOptions={modifyOptions as any}
                    solve={this.solveProblem}
                    isSolveBtnEnable={isSolveBtnEnable(params)}
                />
                <Row>
                {
                    !!_.keys(params).length &&
                    <Col xs={12}>
                        <ParamsBox label='Initial parameters' params={params} modifyParams={modifyParams}/>
                    </Col>
                }
                </Row>
                <BoxHeader>{translate('title.result')}</BoxHeader>
                <SolutionResults>
                    <ResultCard label={translate('problem.identifiability.barChart')}>
                        <IdentifiabilityPlot solution={solution}/>
                    </ResultCard>
                    <ResultCard label={translate('problem.identifiability.resultTable')}>
                        <KeyValueTable 
                            parameters={_.map(solution.solution, (value, key) => ({key, value}))}
                            mathJax={true}
                        />
                    </ResultCard>
                    <ResultCard label={translate('problem.identifiability.pieChart')}>
                        {this.renderPiePlot(solution)}
                    </ResultCard>
                </SolutionResults>
            </Box>
        );
    }
}

export default connectLocale(IdentifiabilityProblem);