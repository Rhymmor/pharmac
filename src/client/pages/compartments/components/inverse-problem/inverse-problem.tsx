import { ResultCard } from '../result-cards/ResultCard';
import { PlotResultCard } from '../result-cards/PlotResultCard';
import { TableResultCard } from '../result-cards/TableResultCard';
import { connectLocale, WithLocale } from '../../../../components/connectLocale';
import { InverseProblemOptions } from './InverseProblemOptions';
import { SolutionResults } from '../SolutionResults';
import { KeyValueTable } from '../table/KeyValueTable';
import { updateInverseProblemLoadingState } from '../../../../redux/actions/solvers/inverse-problem';
import { Dropzone } from '../../../../components/Dropzone';
import { FunctionPlot } from '../plots/FunctionPlot';
import * as classnames from 'classnames';
import { BoxHeader } from '../../../../components/layout';
import {
    IInverseProblemOptions,
    IInverseProblemSolution,
    IInverseProblemSolutionParameters,
    IInverseProblemStore,
    InverseProblemDataSelection,
    InverseProblemDataSelectionType,
    InverseProblemMethods,
    InverseProblemMethodsType,
    validateInverseProblemData,
} from '../../../../redux/reducers/solvers/inverse-problem';
import { IParameters } from '../../../../redux/reducers/formulas';
import { Modifier, Translate } from '../../../../utils/utils';
import { ParamsBox } from '../paramsBox';
import { cutFraction, safeGet, tryParseJSON, UseKeys, UseStrings } from '../../../../../lib/utils';
import ModelOptions from '../ModelOptions';
import { Box } from '../../../../components';
import { InverseProblemPlot } from './inverse-problem-plot';
import { IProblemProps } from '../abstract-problem';
import * as React from 'react';
import { Row, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import * as _ from 'lodash';
import './inverse-problem.scss';

interface IInverseProblemProps extends IProblemProps<
    IInverseProblemSolution,
    IInverseProblemOptions,
    IInverseProblemStore
>, WithLocale {}

interface IInverseProblemState {
}

function getSolutionParametersText(translate: Translate): UseKeys<IInverseProblemSolutionParameters, string> {
    return {
        fun: translate('problem.inverse.solutionParameters.objFunctionValue'),
        nfev: translate('problem.inverse.solutionParameters.objFunctionEvals'),
        nit: translate('problem.inverse.solutionParameters.iters'),
        time: translate('problem.inverse.solutionParameters.runtime'),
    };
}

function isSolveBtnEnable(parameters: IParameters): boolean {
    return !!_.keys(parameters).length;
}

function prepareSolutionParameters(translate: Translate, parameters: IInverseProblemSolutionParameters) {
    const SolutionParametersText = getSolutionParametersText(translate);
    return _.map(Object.keys(parameters), (key: keyof IInverseProblemSolutionParameters) => (
        {key: SolutionParametersText[key], value: cutFraction(parameters[key])}
    ));
}

class InverseProblem extends React.PureComponent<IInverseProblemProps, IInverseProblemState> {
    private static BAR_CHART = 'inverse-problem-bar-chart';

    setLoadingState = (flag: boolean) => this.props.dispatch(updateInverseProblemLoadingState(flag));
    finishLoading = () => this.setLoadingState(false);

    solveProblem = () => {
        this.setLoadingState(true);
        this.props.solve(this.finishLoading);
    }

    modifySyntheticParams = (modify: Modifier<IParameters>) => this.props.modifyOptions(options => {
        modify(options.syntheticParameters);
    })

    loadData = (files: File[]) => {
        const fr = new FileReader();
        const file = files[0];
        fr.readAsText(file);
        fr.onloadend = () => {
            const data = tryParseJSON(fr.result);
            const validator = validateInverseProblemData(data);
            if (validator.valid) {
                this.props.modifyOptions(options => options.dataOptions.data = data);
            } else {

            }
        }
    }

    renderDataSelectionSettings = (options: IInverseProblemOptions) => {
        const {dataOptions: {dataSelection, data}, syntheticParameters} = options;
        if (dataSelection === InverseProblemDataSelection.Synthetic) {
            if (!!_.keys(syntheticParameters).length) {
                return (
                    <ParamsBox
                        label={this.props.translate('problem.inverse.parameters')}
                        params={syntheticParameters}
                        modifyParams={this.modifySyntheticParams}
                    />
                );
            }
        } else if (dataSelection === InverseProblemDataSelection.Experimental) {
            const solution = _.map(data, point => point.value);
            const linspace = _.map(data, point => String(point.time));
            return (
                <div>
                    <BoxHeader>Experimental data</BoxHeader>
                    <Button>
                        <Dropzone className="dropzone-button" onDrop={this.loadData}>Load from file</Dropzone>
                    </Button>
                    <FunctionPlot solution={{solution}} timeLinspace={linspace} dots={true}/>
                </div>
            );
        }
    }

    private getResultLabels = () => {
        const {translate} = this.props;
        return [
            translate('problem.inverse.barChart'),
            translate('problem.inverse.solutionValues'),
            translate('problem.inverse.solutionParameters.title'),
        ];
    }

    render() {
        const {solve, problem: {solution, options, loading}, params, modifyParams, modifyOptions, translate} = this.props;
        const parameters = _.map(solution.solution, (value, key) => ({key, value}));
        const solutionOptions = prepareSolutionParameters(translate, solution.parameters);
        //Typescript type bug
        return (
            <Box className={classnames('direct-box', loading && 'loading-back')}>
                { loading && <div className='loading-wheel'></div> }
                <ModelOptions
                    options={options as any}
                    modifyOptions={modifyOptions as any}
                    solve={this.solveProblem}
                    isSolveBtnEnable={isSolveBtnEnable(options.syntheticParameters)}
                />
                <InverseProblemOptions options={options} modifyOptions={modifyOptions} translate={translate}/>
                <Row>
                    {
                        !!_.keys(params).length &&
                        <Col xs={6}>
                            <ParamsBox
                                label={translate('problem.common.parameters')}
                                params={params}
                                modifyParams={modifyParams}
                            />
                        </Col>
                    }
                    <Col xs={6}>
                        {this.renderDataSelectionSettings(options)}
                    </Col>
                </Row>
                <BoxHeader>{translate('title.result')}</BoxHeader>
                <SolutionResults>
                        <PlotResultCard 
                            label={translate('problem.inverse.barChart')}
                            id={InverseProblem.BAR_CHART}
                        >
                            <InverseProblemPlot 
                                solution={solution}
                                id={InverseProblem.BAR_CHART}
                            />
                        </PlotResultCard>
                        <TableResultCard 
                            label={translate('problem.inverse.solutionValues')}
                            parameters={parameters}
                        >
                            <KeyValueTable
                                parameters={parameters}
                                mathJax={true}
                            />
                        </TableResultCard>
                        <TableResultCard 
                            label={translate('problem.inverse.solutionParameters.title')}
                            parameters={solutionOptions}
                        >
                            <KeyValueTable parameters={solutionOptions}/>
                        </TableResultCard>
                </SolutionResults>
            </Box>
        );
    }
}

export default connectLocale(InverseProblem);