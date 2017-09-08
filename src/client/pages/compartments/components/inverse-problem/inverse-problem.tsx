import * as classnames from 'classnames';
import { BoxHeader } from '../../../../components/layout';
import {
    InverseProblemMethodsType,
    IInverseProblemOptions,
    IInverseProblemSolution,
    IInverseProblemStore,
    InverseProblemMethods
} from '../../../../redux/reducers/solvers/inverse-problem';
import { IParameters } from '../../../../redux/reducers/formulas';
import { Modifier } from '../../../../utils/utils';
import { ParamsBox } from '../paramsBox';
import { safeGet, UseStrings } from '../../../../../lib/utils';
import { ModelOptions } from '../ModelOptions';
import { Box } from '../../../../components';
import { InverseProblemPlot } from './inverse-problem-plot';
import { AbstractProblem, IProblemProps } from '../abstract-problem';
import * as React from 'react';
import { Row, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import * as _ from 'lodash';
import './inverse-problem.scss';

interface IInverseProblemProps extends IProblemProps<IInverseProblemSolution, IInverseProblemOptions, IInverseProblemStore> {
    
}

interface IInverseProblemState {
}

const MethodsText: UseStrings<InverseProblemMethodsType, string> = {
    NelderMead: "Nelder-Mead"
}

export class InverseProblem extends React.PureComponent<IInverseProblemProps, IInverseProblemState> {

    modifyMethod = (value: InverseProblemMethodsType) => this.props.modifyOptions(options => {
        options.method = value;
    })

    modifySyntheticParams = (modify: Modifier<IParameters>) => this.props.modifyOptions(options => {
        modify(options.syntheticParameters);
    })

    renderMethodItems = () => _.map(InverseProblemMethods, (value, key) => (
        <MenuItem key={key} onClick={() => this.modifyMethod(value)}>{MethodsText[value]}</MenuItem>
    ))

    renderMethodsDropdown = (method: InverseProblemMethodsType) => (
        <div className={classnames("methods-dropdown", "inline-block")}>
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

    render() {
        const {solve, problem: {solution, options}, params, modifyParams, modifyOptions} = this.props;
        //Typescript type bug
        return (
            <Box className='direct-box'>  
                <BoxHeader>Options</BoxHeader>  
                <div>
                    <ModelOptions 
                        className='inline-block' 
                        options={options as any} 
                        modifyOptions={modifyOptions as any}
                    />
                    {this.renderMethodsDropdown(options.method)}
                    <Button onClick={solve} className='inline-block'>Solve</Button>
                </div>
                <Row>
                {
                    !!_.keys(params).length &&
                    <Col xs={6}>
                        <ParamsBox label='Initial parameters' params={params} modifyParams={modifyParams}/>
                    </Col>
                }
                {
                    !!_.keys(params).length &&
                    <Col xs={6}>
                        <ParamsBox label='Synthetic parameters' params={options.syntheticParameters} modifyParams={this.modifySyntheticParams}/>
                    </Col>
                }
                </Row>
                <BoxHeader>Result</BoxHeader>
                <Row>
                    <Col xs={6}>
                        <InverseProblemPlot solution={solution}/>
                    </Col>
                </Row>
            </Box>
        );
    }
}