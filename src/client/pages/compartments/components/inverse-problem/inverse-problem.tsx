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
import { Modifier } from '../../../../utils/utils';
import { ParamsBox } from '../paramsBox';
import { cutFraction, safeGet, tryParseJSON, UseKeys, UseStrings } from '../../../../../lib/utils';
import { ModelOptions } from '../ModelOptions';
import { Box } from '../../../../components';
import { InverseProblemPlot } from './inverse-problem-plot';
import { IProblemProps } from '../abstract-problem';
import * as React from 'react';
import { Row, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import * as _ from 'lodash';
import './inverse-problem.scss';

interface IInverseProblemProps extends IProblemProps<IInverseProblemSolution, IInverseProblemOptions, IInverseProblemStore> {
}

interface IInverseProblemState {
}

const SolutionParametersText: UseKeys<IInverseProblemSolutionParameters, string> = {
    fun: 'Value of objective function',
    nfev: 'Number of evaluations of the objective function',
    nit: 'Number of iterations',
    time: 'Execution time (sec)'
}

function isSolveBtnEnable(parameters: IParameters): boolean {
    return !!_.keys(parameters).length;
}

function prepareSolutionParameters(parameters: IInverseProblemSolutionParameters) {
    return _.map(Object.keys(parameters), (key: keyof IInverseProblemSolutionParameters) => (
        {key: SolutionParametersText[key], value: cutFraction(parameters[key])}
    ));
}

export class InverseProblem extends React.PureComponent<IInverseProblemProps, IInverseProblemState> {
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
                        label='Synthetic parameters' 
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

    render() {
        const {solve, problem: {solution, options, loading}, params, modifyParams, modifyOptions} = this.props;
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
                <InverseProblemOptions options={options} modifyOptions={modifyOptions}/>
                <Row>
                    {
                        !!_.keys(params).length &&
                        <Col xs={6}>
                            <ParamsBox label='Initial parameters' params={params} modifyParams={modifyParams}/>
                        </Col>
                    }
                    <Col xs={6}>
                        {this.renderDataSelectionSettings(options)}
                    </Col>
                </Row>
                <BoxHeader>Result</BoxHeader>
                <SolutionResults labels={["Bar plot", "Solution values", "Solution parameters"]}>
                        <InverseProblemPlot solution={solution}/>
                        <KeyValueTable 
                            parameters={_.map(solution.solution, (value, key) => ({key, value}))} 
                            mathJax={true}
                        />
                         <KeyValueTable parameters={prepareSolutionParameters(solution.parameters)}/>
                </SolutionResults>
            </Box>
        );
    }
}