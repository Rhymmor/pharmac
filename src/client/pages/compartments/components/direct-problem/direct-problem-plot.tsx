import { safeGet } from '../../../../../lib/utils';
import * as React from 'react';
const rc = require('recharts');
import * as _ from 'lodash';
import {IDirectProblemSolution, IDirectProblemOptions} from '../../../../../lib/common';

export interface IDataset {
    label?: string
    fill?: boolean
    cubicInterpolationMode?: 'default' | 'monotone'
    lineTension?: number
    borderColor?: string
    pointBorderColor?: string
    pointBackgroundColor?: string
    backgroundColor?: string | string[]
    hoverBackgroundColor?: string | string[]
    pointRadius?: number
    data: Array<number>
}

export interface IData {
    labels?: (string | number)[]
    datasets: IDataset[]
}

export interface IOptions {
    title?: {
        display: boolean
        text: string
    },
    legend?: {
        display: boolean
        labels?: {
            fontColor: string
        }
    },
    tooltips?: {
        enabled: boolean
        mode: string
    },
    scales?: IScales
}

export interface IScales {
    xAxes: IAxe[]
    yAxes: IAxe[]
}

export interface IAxe {
    scaleLabel?: {display?: boolean, labelString: string}
    ticks?: {
        min?: number
        max?: number
        autoSkip?: boolean,
        autoSkipPadding?: number,
        beginAtZero?: boolean
    }
}

interface IDirectProblemPlotProps {
    className?: string
    solution: IDirectProblemSolution;
    options: IDirectProblemOptions;
}

interface IDirectProblemPlotState {
    data: any
}

const chartsColors = ["#FF6384", "#00CC88", "#36A2EB", "#CB9BCC", "#FFCE56", 'rgb(128, 128, 128)'];
const defaultClassName = 'chart-box';

const getLabel = (interval: number, length: number, idx: number) => String(idx * interval / (length - 1));

function confugureChartData(solution: IDirectProblemSolution, interval: number) {
    const data: {[key: string]: string | number}[] = [];
    for (let i = 0; i < safeGet(solution, x=>x.solution.length, 0); i++) {
        const dataset: {[key: number]: number} = {};
        for (let j = 0; j < safeGet(solution, x=>x.solution[i].length, 0); j++) {
            dataset[j + 1] = solution.solution[i][j];
        }
        data.push({label: getLabel(interval, solution.solution.length, i), ...dataset});
    }
    return data;
}

export class DirectProblemPlot extends React.PureComponent<IDirectProblemPlotProps, IDirectProblemPlotState> {
    constructor(props: IDirectProblemPlotProps) {
        super(props);
        this.state = {
            data: confugureChartData(props.solution, props.options.interval),
        }
    }

    componentWillReceiveProps(nextProps: IDirectProblemPlotProps) {
        this.setState({
            data: confugureChartData(nextProps.solution, nextProps.options.interval)
        });
    }

    render() {
        const {className, solution} = this.props;
        const {data} = this.state;
        return (
            <div className={className || defaultClassName}>
                <rc.LineChart width={600} height={300} data={data}>
                    {_.map(safeGet(solution, x=>x.solution[0]), (x, idx) => (
                        <rc.Line key={idx} type="monotone" dataKey={`${idx + 1}`} stroke={chartsColors[idx]} dot={false}/>
                    ))}
                    <rc.XAxis dataKey="label" />
                    <rc.Tooltip/>
                    <rc.Legend />
                    <rc.YAxis type="number" />
                </rc.LineChart>
            </div>
        );
    }
}