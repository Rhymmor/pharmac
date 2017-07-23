import { ParamsBox } from '../paramsBox';
import { StatefulFormControl } from '../../../../components/statefulInput';
import { safeGet } from '../../../../../lib/utils';
import { IDirectProblemStore } from '../../../../redux/reducers/direct-problem';
import { Modifier } from '../../../../utils/utils';
import { IDirectProblemOptions, IDirectProblemSolution } from '../../../../../lib/common';
import { DirectProblemPlot } from './direct-problem-plot';
import { IModel, IParameters } from '../../../../redux/reducers/formulas';
import { BoxHeader, Box } from '../../../../components/layout';
import * as React from 'react';
import * as request from 'superagent';
import { Row, Col, Button } from 'react-bootstrap';
import * as _ from 'lodash';

interface IDirectProblemProps {
    solve: () => void;
    modifyOptions: (modify: Modifier<IDirectProblemOptions>) => void;
    directProblem: IDirectProblemStore;
    params: IParameters;
    modifyParams: (modify: Modifier<IParameters>) => void;
}

interface IDirectProblemState {
}

export class DirectProblem extends React.PureComponent<IDirectProblemProps, IDirectProblemState> {
    modifyOptionKey = (key: keyof IDirectProblemOptions) => {
        return (value: number) => {
            this.props.modifyOptions((options) => {
                options[key] = value > 0 && _.isInteger(value) ? value : null
            });
        }
    }

    renderInput = (key: keyof IDirectProblemOptions) => (
        <StatefulFormControl 
            className='inline-block direct-problem-input'
            value={safeGet(this.props.directProblem, x => x.options[key])} 
            parser={Number} 
            onSubmit={this.modifyOptionKey(key)}
        />
    )

    render() {
        const {solve, directProblem: {solution, options}, params, modifyParams} = this.props;
        return (
            <Box className='direct-box'>
                <div>
                    <span>Interval:</span>
                    {this.renderInput('interval')}
                    <span>Points number:</span>
                    {this.renderInput('points')}
                    <Button onClick={solve} className='inline-block'>Solve</Button>
                </div>
                <Row>
                    {
                         !!safeGet(solution, x=>x.solution.length) && 
                        <Col xs={6}>
                            <DirectProblemPlot solution={solution} options={options}/>
                        </Col>
                    }
                    {
                        !!_.keys(params).length &&
                        <Col xs={6}>
                            <ParamsBox params={params} modifyParams={modifyParams}/>
                        </Col>
                    }
                </Row>
            </Box>
        );
    }
}