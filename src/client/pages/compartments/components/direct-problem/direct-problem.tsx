import { BoxHeader } from '../../../../components/layout';
import { ParamsBox } from '../paramsBox';
import { safeGet } from '../../../../../lib/utils';
import { ModelOptions } from '../ModelOptions';
import { Box } from '../../../../components';
import { IProblemProps } from '../abstract-problem';
import { DirectProblemPlot } from './direct-problem-plot';
import * as React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import * as _ from 'lodash';

interface IDirectProblemProps extends IProblemProps<any, any, any> {
}

interface IDirectProblemState {
}

export class DirectProblem extends React.PureComponent<IDirectProblemProps, IDirectProblemState> {
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
        return (
            //TODO: get classname from props
            <Box className='direct-box'>    
                {this.renderCommonOptions()}
                <Row>
                    {
                        !!_.keys(params).length &&
                        <Col xs={12}>
                            <ParamsBox label='Parameters' params={params} modifyParams={modifyParams}/>
                        </Col>
                    }
                </Row>
                <BoxHeader>Result</BoxHeader>
                <Row>
                    <Col xs={6}>
                        <DirectProblemPlot solution={solution} options={options}/>
                    </Col>
                </Row>
            </Box>
        );
    }
}