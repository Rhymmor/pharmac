import { SolutionResults } from '../SolutionResults';
import { updateDirectProblemLoadingState } from '../../../../redux/actions/solvers/direct-problem';
import { IUpdateLoadingState } from '../../../../redux/actions/solvers';
import {
    IDirectProblemOptions,
    IDirectProblemSolution,
    IDirectProblemStore
} from '../../../../redux/reducers/solvers/direct-problem';
import * as classnames from 'classnames';
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

interface IDirectProblemProps extends IProblemProps<IDirectProblemSolution, IDirectProblemOptions, IDirectProblemStore> {
}

interface IDirectProblemState {
}

export class DirectProblem extends React.PureComponent<IDirectProblemProps, IDirectProblemState> {

    setLoadingState = (flag: boolean) => this.props.dispatch(updateDirectProblemLoadingState(flag));
    finishLoading = () => this.setLoadingState(false);

    solveProblem = () => {
        this.setLoadingState(true);
        this.props.solve(this.finishLoading);
    }

    render() {
        const {solve, problem: {solution, options, loading}, params, modifyParams, modifyOptions} = this.props;
        return (
            //TODO: get classname from props
            <Box className={classnames('direct-box', loading && 'loading-back')}>
                { loading && <div className='loading-wheel'></div> }
                <ModelOptions 
                    options={options as any} 
                    modifyOptions={modifyOptions as any}
                    solve={this.solveProblem}
                />
                <Row>
                    {
                        !!_.keys(params).length &&
                        <Col xs={12}>
                            <ParamsBox label='Parameters' params={params} modifyParams={modifyParams}/>
                        </Col>
                    }
                </Row>
                <BoxHeader>Result</BoxHeader>
                <SolutionResults labels={["Functions plot"]}>
                    <DirectProblemPlot solution={solution} options={options}/>
                </SolutionResults>
                <Row>
                    <Col xs={6}>
                        
                    </Col>
                </Row>
            </Box>
        );
    }
}