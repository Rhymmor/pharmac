import { IIdentifiabilityOptions, IIdentifiabilityStore } from '../../../../redux/reducers/identifiability';
import { ParamsBox } from '../paramsBox';
import { StatefulFormControl } from '../../../../components/statefulInput';
import { safeGet } from '../../../../../lib/utils';
import { Modifier } from '../../../../utils/utils';
import { IModel, IParameters } from '../../../../redux/reducers/formulas';
import { BoxHeader, Box } from '../../../../components/layout';
import * as React from 'react';
import * as request from 'superagent';
import { Row, Col, Button } from 'react-bootstrap';
import * as _ from 'lodash';

interface IIdentifiabilityProps {
    solve: () => void;
    modifyOptions: (modify: Modifier<IIdentifiabilityOptions>) => void;
    identifyStore: IIdentifiabilityStore;
    params: IParameters;
    modifyParams: (modify: Modifier<IParameters>) => void;
}

interface IIdentifiabilityState {
}

export class IdentifiabilityProblem extends React.PureComponent<IIdentifiabilityProps, IIdentifiabilityState> {
    modifyOptionKey = (key: keyof IIdentifiabilityOptions) => {
        return (value: number) => {
            this.props.modifyOptions((options) => {
                options[key] = value > 0 && _.isInteger(value) ? value : null
            });
        }
    }

    renderInput = (key: keyof IIdentifiabilityOptions) => (
        <StatefulFormControl 
            className='inline-block direct-problem-input'
            value={safeGet(this.props.identifyStore, x => x.options[key])} 
            parser={Number} 
            onSubmit={this.modifyOptionKey(key)}
        />
    )

    render() {
        const {solve, identifyStore: {solution, options}, params, modifyParams} = this.props;
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