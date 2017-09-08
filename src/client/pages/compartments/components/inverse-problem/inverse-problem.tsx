import { BoxHeader } from '../../../../components/layout';
import {
    IInverseProblemOptions,
    IInverseProblemSolution,
    IInverseProblemStore
} from '../../../../redux/reducers/solvers/inverse-problem';
import { IParameters } from '../../../../redux/reducers/formulas';
import { Modifier } from '../../../../utils/utils';
import { ParamsBox } from '../paramsBox';
import { safeGet } from '../../../../../lib/utils';
import { ModelOptions } from '../ModelOptions';
import { Box } from '../../../../components';
import { InverseProblemPlot } from './inverse-problem-plot';
import { AbstractProblem, IProblemProps } from '../abstract-problem';
import * as React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import * as _ from 'lodash';

interface IInverseProblemProps extends IProblemProps<IInverseProblemSolution, IInverseProblemOptions, IInverseProblemStore> {
    modifySyntheticParams: (modify: Modifier<IParameters>) => void;
}

interface IInverseProblemState {
}

export class InverseProblem extends React.PureComponent<IInverseProblemProps, IInverseProblemState> {
    render() {
        const {solve, problem: {solution, options}, params, modifyParams, modifyOptions, modifySyntheticParams} = this.props;
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
                        <ParamsBox label='Synthetic parameters' params={options.syntheticParameters} modifyParams={modifySyntheticParams}/>
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