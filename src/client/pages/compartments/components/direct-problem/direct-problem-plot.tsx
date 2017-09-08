import { IPlotProps } from '../abstract-problem';
import { safeGet } from '../../../../../lib/utils';
import * as React from 'react';
import * as _ from 'lodash';
import {IDirectProblemSolution, IDirectProblemOptions} from '../../../../redux/reducers/solvers/direct-problem';
const {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line} = require('recharts');

interface IDirectProblemPlotProps extends IPlotProps<IDirectProblemSolution, IDirectProblemOptions> {
}

type DirectProblemData = {[key: string]: string | number}[];

interface IDirectProblemPlotState {
    data: DirectProblemData;
}

const chartsColors = ["#FF6384", "#00CC88", "#36A2EB", "#CB9BCC", "#FFCE56", 'rgb(128, 128, 128)'];
const defaultClassName = 'chart-box';

const getLabel = (interval: number, length: number, idx: number) => String(idx * interval / (length - 1));

function configureChartData(solution: IDirectProblemSolution, interval: number) {
    if (solution && solution.solution && solution.solution.length) {
        return getChartData(solution, interval);
    }

    return getDefaultData();
}

function getChartData(solution: IDirectProblemSolution, interval: number) {
    const data: DirectProblemData = [];
    for (let i = 0; i < safeGet(solution, x=>x.solution.length, 0); i++) {
        const dataset: {[key: number]: number} = {};
        for (let j = 0; j < safeGet(solution, x=>x.solution[i].length, 0); j++) {
            dataset[j + 1] = solution.solution[i][j];
        }
        data.push({label: getLabel(interval, solution.solution.length, i), ...dataset});
    }
    return data;
}

function getDefaultData(): DirectProblemData {
    return [{1: 0, label: "0"}];
}

export class DirectProblemPlot extends React.PureComponent<IDirectProblemPlotProps, IDirectProblemPlotState> {
    constructor(props: IDirectProblemPlotProps) {
        super(props);
        this.state = {
            data: configureChartData(props.solution, props.options.interval),
        }
    }

    componentWillReceiveProps(nextProps: IDirectProblemPlotProps) {
        this.setState({
            data: configureChartData(nextProps.solution, nextProps.options.interval)
        });
    }

    render() {
        const {className, solution} = this.props;
        const {data} = this.state;
        return (
            <div className={className || defaultClassName}>
                <LineChart width={600} height={300} data={data}>
                    {_.map(safeGet(solution, x=>x.solution[0], [0]), (x, idx) => (
                        <Line key={idx} type="monotone" dataKey={`${idx + 1}`} stroke={chartsColors[idx]} dot={false}/>
                    ))}
                    <XAxis dataKey="label" />
                    <Tooltip/>
                    <Legend />
                    <YAxis type="number" />
                </LineChart>
            </div>
        );
    }
}