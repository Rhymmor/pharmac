import { ParamsBox } from './paramsBox';
import { Box } from '../../../components';
import { StatefulFormControl } from '../../../components/statefulInput';
import { ICommonOptions, ICommonProblemStore, ICommonSolution } from '../../../redux/reducers/solvers';
import { IParameters } from '../../../redux/reducers/formulas';
import * as React from 'react';
import { Modifier } from '../../../utils/utils';
import { safeGet } from '../../../../lib/utils';
import { Row, Col, Button } from 'react-bootstrap';
import * as _ from 'lodash';

export interface IPlotProps<S extends ICommonSolution<any>, T extends ICommonOptions> {
    className?: string
    solution: S;
    options: T;
}

export interface IProblemProps<S extends ICommonSolution<any>, T extends ICommonOptions, K extends ICommonProblemStore<T, S>> {
    solve: () => void;
    modifyOptions: (modify: Modifier<T>) => void;
    problem: K;
    params: IParameters;
    modifyParams: (modify: Modifier<IParameters>) => void;
}

interface IAbstractProblemProps<S extends ICommonSolution<any>, T extends ICommonOptions, K extends ICommonProblemStore<T, S>>
        extends IProblemProps<S, T, K> {
    Plot: React.ComponentClass<IPlotProps<S, T>>
}

interface IAbstractProblemState {
}

export class AbstractProblem<S extends ICommonSolution<any>, T extends ICommonOptions, K extends ICommonProblemStore<T, S>> 
        extends React.PureComponent<IAbstractProblemProps<S, T, K>, IAbstractProblemState> {

    modifyOptionKey = (key: keyof T) => {
        return (value: any) => {    //TODO: Typescript bug
            this.props.modifyOptions((options) => {
                options[key] = value > 0 && _.isInteger(value) ? value : null
            });
        }
    }

    renderInput = (key: keyof T) => (
        <StatefulFormControl 
            className='inline-block direct-problem-input'   //TODO: get classname from props
            value={safeGet(this.props.problem, x => x.options[key])} 
            parser={Number} 
            onSubmit={this.modifyOptionKey(key)}
        />
    )

    render() {
        const {solve, problem: {solution, options}, params, modifyParams, Plot} = this.props;
        return (
            //TODO: get classname from props
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
                        !!safeGet(solution, x=>_.keys(x.solution).length) && 
                        <Col xs={6}>
                            <Plot solution={solution} options={options}/>
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
