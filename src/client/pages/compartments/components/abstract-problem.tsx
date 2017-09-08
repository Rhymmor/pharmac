import { ModelOptions } from './ModelOptions';
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
    options?: T;
}

export interface IProblemProps<S extends ICommonSolution<any>, T extends ICommonOptions, K extends ICommonProblemStore<T, S>> {
    solve: () => void;
    modifyOptions: (modify: Modifier<T>) => void;
    problem: K;
    params: IParameters;
    modifyParams: (modify: Modifier<IParameters>) => void;
}