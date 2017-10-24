import { connectLocale, WithLocale } from '../../../../components/connectLocale';
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

interface IDirectProblemProps extends IProblemProps<IDirectProblemSolution, IDirectProblemOptions, IDirectProblemStore>, WithLocale {
}

interface IDirectProblemState {
}

class DirectProblemImpl extends React.PureComponent<IDirectProblemProps, IDirectProblemState> {

    private setLoadingState = (flag: boolean) => this.props.dispatch(updateDirectProblemLoadingState(flag));
    finishLoading = () => this.setLoadingState(false);

    solveProblem = () => {
        this.setLoadingState(true);
        this.props.solve(this.finishLoading);
    }

    render() {
        const {solve, translate, problem: {solution, options, loading}, params, modifyParams, modifyOptions} = this.props;
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
                            <ParamsBox label={translate('problem.common.parameters')} params={params} modifyParams={modifyParams}/>
                        </Col>
                    }
                </Row>
                <BoxHeader>{translate('title.result')}</BoxHeader>
                <SolutionResults labels={[translate('problem.direct.functionsPlot')]}>
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

export default connectLocale(DirectProblemImpl);