import { IParameters } from '../../../../redux/reducers/formulas';
import { safeGet } from '../../../../../lib/utils';
import * as React from 'react';
import * as _ from 'lodash';
const {BarChart, Bar, XAxis, YAxis, Tooltip, Legend} = require('recharts');

interface ParameterSolution {
    solution: IParameters;
}

interface IProps {
    solution: ParameterSolution;
}

interface IState {
    data: ISolution;
}

interface ISolutionData {
    name: string;
    value: number;
}

type ISolution = ISolutionData[];

function getDefaultSolution(): ISolution {
    return [{name: '', value: 0}];
}

function configureChartData(solution: ParameterSolution): ISolution {
    if (solution && solution.solution && _.keys(solution.solution).length) {
        return _.map(safeGet(solution, x => x.solution), (value, key) => {
            return {name: key, value};
        });
    }

    return getDefaultSolution();
}

const barColor = '#43A8E7';

export class ParametersPlot extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: configureChartData(props.solution),
        }
    }

    componentWillReceiveProps(nextProps: IProps) {
        this.setState({
            data: configureChartData(nextProps.solution)
        });
    }

    render() {
        return (
            <BarChart width={600} height={300} data={this.state.data}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="value" fill={barColor} maxBarSize={100}/>
            </BarChart>
        );
    }
}
