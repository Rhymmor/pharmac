import { ICommonProblemStore } from '../../../../redux/reducers/solvers';
import { AbstractProblem, IProblemProps } from '../abstract-problem';
import { ParamsBox } from '../paramsBox';
import { StatefulFormControl } from '../../../../components/statefulInput';
import { safeGet } from '../../../../../lib/utils';
import { IDirectProblemStore, IDirectProblemOptions, IDirectProblemSolution } from '../../../../redux/reducers/solvers/direct-problem';
import { Modifier } from '../../../../utils/utils';
import { DirectProblemPlot } from './direct-problem-plot';
import { IModel, IParameters } from '../../../../redux/reducers/formulas';
import { BoxHeader, Box } from '../../../../components/layout';
import * as React from 'react';
import * as request from 'superagent';
import { Row, Col, Button } from 'react-bootstrap';
import * as _ from 'lodash';

interface IDirectProblemProps extends IProblemProps<any, any, any> {
}

interface IDirectProblemState {
}

export class DirectProblem extends React.PureComponent<IDirectProblemProps, IDirectProblemState> {
    render() {
        const {solve, problem, params, modifyParams, modifyOptions} = this.props;
        //Typescript type bug
        return (
            <AbstractProblem
                solve={solve}
                params={params}
                modifyParams={modifyParams}
                modifyOptions={modifyOptions}
                problem={problem}
                Plot={DirectProblemPlot as any}
            />
        );
    }
}