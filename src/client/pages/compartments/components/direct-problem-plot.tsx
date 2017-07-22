import { safeGet } from '../../../../lib/utils';
import { IDirectProblemSolution } from '../../../../server/modules/model-solver';
import * as React from 'react';
import {Line} from 'react-chartjs-2';


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
}

interface IDirectProblemPlotState {
    data: IData
    options: IOptions
}

const chartsColors = ["#FF6384", "#00CC88", "#36A2EB", "#CB9BCC", "#FFCE56", 'rgb(128, 128, 128)'];
const defaultClassName = 'chart-box classWithPad';

function configureData(solution: IDirectProblemSolution): IData {
    const labels: string[] = []
    const datasets: IDataset[] = [];
    for (let i = 0; i < safeGet(solution, x=>x.solution[0].length, 0); i++) {
        datasets.push({
            label: `x_${i + 1}`,
            //cubicInterpolationMode: 'monotone',
            lineTension: 2,
            fill: false,
            borderColor: chartsColors[i],
            backgroundColor: chartsColors[i],
            pointRadius: 0,
            data: []
        })
    }
    for (let i = 0; i < safeGet(solution, x=>x.solution.length, 0); i++) {
        for (let j = 0; j < safeGet(solution, x=>x.solution[i].length, 0); j++) {
            datasets[j].data.push(solution.solution[i][j]);
        }
        //TODO: remove harcoded interval
        labels.push(String(i * 10 / (solution.solution.length - 1)));
    }
    return { labels, datasets }
}

function configureOptions(solution: IDirectProblemSolution): IOptions {
    return ({
        title: {
            display: true,
            text: "Direct problem solution"
        },
        legend: {
            display: true
        },
        tooltips: {
            enabled: true,
            mode: 'label'
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'time'
                },
                ticks: {
                    autoSkip: true,
                    autoSkipPadding: 15
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    });
}

export class DirectProblemPlot extends React.PureComponent<IDirectProblemPlotProps, IDirectProblemPlotState> {
    constructor(props: IDirectProblemPlotProps) {
        super(props);
        this.state = {
            data: configureData(props.solution),
            options: configureOptions(props.solution)
        }
    }

    componentWillReceiveProps(nextProps: IDirectProblemPlotProps) {
        this.setState({
            data: configureData(nextProps.solution),
            options: configureOptions(nextProps.solution)
        });
    }

    render() {
        const {className} = this.props;
        const {data, options} = this.state;
        return (
            <div className={className || defaultClassName}>
                <Line 
                    data={data}
                    options={options}
                    width={400}
                    height={400}
                />
            </div>
        );
    }
}