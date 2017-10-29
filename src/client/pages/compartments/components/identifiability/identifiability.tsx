import { ResultCard } from '../result-cards/ResultCard';
import { PlotResultCard } from '../result-cards/PlotResultCard';
import { TableResultCard } from '../result-cards/TableResultCard';
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
    private static BAR_PLOT_ID = 'identifiability-bar-plot';
    private static PIE_PLOT_ID = 'identifiability-bar-plot';

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

    renderPiePlot = (solution: IIdentifiabilitySolution) => (
        <ParametersPlot 
            solution={solution} 
            type={PlotType.pie}
            id={IdentifiabilityProblem.PIE_PLOT_ID}
        />
    )

    render() {
        const {solve, translate, problem: {solution, options, loading}, params, modifyParams, modifyOptions} = this.props;
        const parameters = _.map(solution.solution, (value, key) => ({key, value}));
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
                    <PlotResultCard 
                        label={translate('problem.identifiability.barChart')}
                        id={IdentifiabilityProblem.BAR_PLOT_ID}
                    >
                        <IdentifiabilityPlot 
                            solution={solution}
                            id={IdentifiabilityProblem.BAR_PLOT_ID}
                        />
                    </PlotResultCard>
                    <TableResultCard 
                        label={translate('problem.identifiability.resultTable')}
                        parameters={parameters}
                    >
                        <KeyValueTable 
                            parameters={parameters}
                            mathJax={true}
                        />
                    </TableResultCard>
                    <PlotResultCard 
                        label={translate('problem.identifiability.pieChart')}
                        id={IdentifiabilityProblem.PIE_PLOT_ID}
                    >
                        {this.renderPiePlot(solution)}
                    </PlotResultCard>
                </SolutionResults>
            </Box>
        );
    }
}

export default connectLocale(IdentifiabilityProblem);