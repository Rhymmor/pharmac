import { ModelOptions } from '../ModelOptions';
import { Box, BoxHeader } from '../../../../components';
import { IProblemProps } from '../abstract-problem';
import { IdentifiabilityPlot } from './identifiability-plot';
import * as React from 'react';
import { Row, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { ParamsBox } from '../paramsBox';
import * as _ from 'lodash';

interface IIdentifiabilityProps extends IProblemProps<any, any, any> {
}

interface IIdentifiabilityState {
}

export class IdentifiabilityProblem extends React.PureComponent<IIdentifiabilityProps, IIdentifiabilityState> {
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
                    <Button onClick={solve} className='inline-block'>Solve</Button>
                </div>
            </div>
        );
    }

    render() {
        const {solve, problem: {solution, options}, params, modifyParams, modifyOptions} = this.props;
        //Typescript type bug
        return (
            <Box className='direct-box'>  
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
                <Row>
                    <Col xs={6}>
                        <IdentifiabilityPlot solution={solution}/>
                    </Col>
                </Row>
            </Box>
        );
    }
}