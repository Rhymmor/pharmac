import { ICommonOptions } from '../../../../redux/reducers/solvers';
import { IPlotProps } from '../abstract-problem';
import { safeGet } from '../../../../../lib/utils';
import * as React from 'react';
import * as _ from 'lodash';
const {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line} = require('recharts');

interface IFunctionPlotProps<T extends ICommonOptions> extends IPlotProps<IFunctionSolution, T> {
    timeLinspace?: string[];
    dots?: boolean;
}

interface IFunctionSolution {
    solution: number[][];
}

type FunctionData = {[key: string]: string | number}[];

interface IFunctionPlotState {
    data: FunctionData;
}

export const chartsColors = ["#FF6384", "#00CC88", "#36A2EB", "#CB9BCC", "#FFCE56", 'rgb(128, 128, 128)'];
export const defaultClassName = 'chart-box';

const getLabel = (interval: number, length: number, idx: number) => String(idx * interval / (length - 1));

function getLinspace(interval: number, count: number) {
    const linspace: string[] = [];
    for (let i = 0; i < count; i++) {
        linspace.push(getLabel(interval, count, i));
    }
    return linspace;
}

function configureChartData(solution: IFunctionSolution, linspace: string[]) {
    if (solution && solution.solution && solution.solution.length) {
        return getChartData(solution, linspace);
    }

    return getDefaultData();
}

function getChartData(solution: IFunctionSolution, linspace: string[]) {
    const data: FunctionData = [];
    for (let i = 0; i < safeGet(solution, x=>x.solution.length, 0); i++) {
        const dataset: {[key: number]: number} = {};
        for (let j = 0; j < safeGet(solution, x=>x.solution[i].length, 0); j++) {
            dataset[j + 1] = solution.solution[i][j];
        }
        data.push({label: linspace[i], ...dataset});
    }
    return data;
}

function getDefaultData(): FunctionData {
    return [{1: 0, label: "0"}];
}

export class FunctionPlot<T extends ICommonOptions> extends React.PureComponent<IFunctionPlotProps<T>, IFunctionPlotState> {
    constructor(props: IFunctionPlotProps<T>) {
        super(props);
        const linspace = props.timeLinspace || getLinspace(props.options.interval, safeGet(props.solution, x=>x.solution.length));
        this.state = {
            data: configureChartData(props.solution,  linspace),
        }
    }

    componentWillReceiveProps(nextProps: IFunctionPlotProps<T>) {
        const linspace = nextProps.timeLinspace 
            || getLinspace(nextProps.options.interval, safeGet(nextProps.solution, x=>x.solution.length));
        this.setState({
            data: configureChartData(nextProps.solution, linspace)
        });
    }

    render() {
        const {className, solution, dots, id} = this.props;
        const {data} = this.state;
        return (
            <div className={className || defaultClassName} id={id}>
                <LineChart width={600} height={300} data={data}>
                    {_.map(safeGet(solution, x=>x.solution[0], [0]), (x, idx) => (
                        <Line key={idx} type="monotone" dataKey={`${idx + 1}`} stroke={chartsColors[idx]} dot={dots || false}/>
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