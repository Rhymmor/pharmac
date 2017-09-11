import { SolutionResults } from '../SolutionResults';
import { ParametersTable } from '../table/ParametersTable';
import { updateInverseProblemLoadingState } from '../../../../redux/actions/solvers/inverse-problem';
import { Dropzone } from '../../../../components/Dropzone';
import { FunctionPlot } from '../plots/FunctionPlot';
import * as classnames from 'classnames';
import { BoxHeader } from '../../../../components/layout';
import {
    IInverseProblemOptions,
    IInverseProblemSolution,
    IInverseProblemStore,
    InverseProblemDataSelection,
    InverseProblemDataSelectionType,
    InverseProblemMethods,
    InverseProblemMethodsType,
    validateInverseProblemData
} from '../../../../redux/reducers/solvers/inverse-problem';
import { IParameters } from '../../../../redux/reducers/formulas';
import { Modifier } from '../../../../utils/utils';
import { ParamsBox } from '../paramsBox';
import { safeGet, tryParseJSON, UseStrings } from '../../../../../lib/utils';
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

const MethodsText: UseStrings<InverseProblemMethodsType, string> = {
    NelderMead: "Nelder-Mead",
    BFGS: "BFGS",
    Powell: "Powell",
    CG: "Conjugate gradient",
    "L-BFGS-B": "L-BFGS-B",
    TNC: "Truncated Newton",
    COBYLA: "COBYLA",
    SLSQP: "SLSQP"
}

const MethodsTooltip: UseStrings<InverseProblemMethodsType, string> = {
    NelderMead: "Nelder-Mead simplex method",
    BFGS: "Broyden–Fletcher–Goldfarb–Shanno algorithm",
    Powell: "Powell's conjugate direction method",
    CG: "Conjugate gradient method",
    "L-BFGS-B": "Limited-memory Broyden–Fletcher–Goldfarb–Shanno algorithm for bound-constrained optimization",
    TNC: "Truncated Newton (TNC) method",
    COBYLA: "Constrained optimization by linear approximation",
    SLSQP: "Sequential quadratic programming"
}

const DataSelectionText: UseStrings<InverseProblemDataSelectionType, string> = {
    Synthetic: "Synthetic data",
    Experimental: "Experimental data"
}

function isSolveBtnEnable(parameters: IParameters): boolean {
    return !!_.keys(parameters).length;
}

export class InverseProblem extends React.PureComponent<IInverseProblemProps, IInverseProblemState> {
    setLoadingState = (flag: boolean) => this.props.dispatch(updateInverseProblemLoadingState(flag));
    finishLoading = () => this.setLoadingState(false);

    solveProblem = () => {
        this.setLoadingState(true);
        this.props.solve(this.finishLoading);
    }

    modifyMethod = (value: InverseProblemMethodsType) => this.props.modifyOptions(options => {
        options.method = value;
    })

    modifyDataSelection = (value: InverseProblemDataSelectionType) => this.props.modifyOptions(options => {
        options.dataSelection = value;
    })

    modifySyntheticParams = (modify: Modifier<IParameters>) => this.props.modifyOptions(options => {
        modify(options.syntheticParameters);
    })

    renderMethodItems = () => _.map(InverseProblemMethods, (value, key) => (
        <MenuItem 
            key={key}
            onClick={() => this.modifyMethod(value)}
        >
            <span title={MethodsTooltip[value]}>{MethodsText[value]}</span>
        </MenuItem>
    ))

    renderMethodsDropdown = (method: InverseProblemMethodsType) => (
        <div className={classnames("methods-dropdown", "inline-block")} title={MethodsTooltip[method]}>
            <span>Solution method:</span>
            <DropdownButton
                id="inverseProblemMethods"
                title={MethodsText[method]}
                className={classnames("methods-dropdown-button", "direct-problem-input")}
            >
                {this.renderMethodItems()}
            </DropdownButton>
        </div>
    )

    renderDataSelectionItems = () => _.map(InverseProblemDataSelection, (value, key) => (
        <MenuItem key={key} onClick={() => this.modifyDataSelection(value)}>{DataSelectionText[value]}</MenuItem>
    ))

    renderDataSelectionDropdown = (type: InverseProblemDataSelectionType) => (
        <div className={classnames("methods-dropdown", "inline-block")}>
            <span>Data selection method:</span>
            <DropdownButton
                id="dataSelectionMethods"
                title={DataSelectionText[type]}
                className={classnames("methods-dropdown-button", "direct-problem-input")}
            >
                {this.renderDataSelectionItems()}
            </DropdownButton>
        </div>
    )

    renderInverseOptions = (options: IInverseProblemOptions) => (
        <div>
            <BoxHeader>Inverse Problem options</BoxHeader>
            <div>
                {this.renderMethodsDropdown(options.method)}
                {this.renderDataSelectionDropdown(options.dataSelection)}
            </div>
        </div>
    )

    renderCommonOptions = () => {
        const {problem: {options}, modifyOptions, solve} = this.props;
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
                        disabled={!isSolveBtnEnable(options.syntheticParameters)}
                    >
                        Solve
                    </Button>
                </div>
            </div>
        );
    }

    loadData = (files: File[]) => {
        const fr = new FileReader();
        const file = files[0];
        fr.readAsText(file);
        fr.onloadend = () => {
            const data = tryParseJSON(fr.result);
            const validator = validateInverseProblemData(data);
            if (validator.valid) {
                this.props.modifyOptions(options => options.data = data);
            } else {
                
            }
        }
    }

    renderDataSelectionSettings = (options: IInverseProblemOptions) => {
        if (options.dataSelection === InverseProblemDataSelection.Synthetic) {
            if (!!_.keys(options.syntheticParameters).length) {
                return (
                    <ParamsBox 
                        label='Synthetic parameters' 
                        params={options.syntheticParameters} 
                        modifyParams={this.modifySyntheticParams}
                    />
                );
            }
        } else if (options.dataSelection === InverseProblemDataSelection.Experimental) {
            const solution = _.map(options.data, point => point.value);
            const linspace = _.map(options.data, point => String(point.time));
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
                {this.renderCommonOptions()}
                {this.renderInverseOptions(options)}
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
                <SolutionResults labels={["Bar plot", "Results value table"]}>
                        <InverseProblemPlot solution={solution}/>
                        <ParametersTable parameters={solution.solution}/>
                </SolutionResults>
            </Box>
        );
    }
}