import { IPlotProps } from '../abstract-problem';
import { chartsColors, defaultClassName } from './FunctionPlot';
import { IParameters } from '../../../../redux/reducers/formulas';
import { Enum, safeGet } from '../../../../../lib/utils';
import * as React from 'react';
import * as _ from 'lodash';
const {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell} = require('recharts');

export interface ParameterSolution {
    solution: IParameters;
}

type IPlotType = "pie" | "bar";

export const PlotType: Readonly<Enum<IPlotType>> = {
    pie: 'pie',
    bar: 'bar'
}

interface IProps extends IPlotProps<ParameterSolution, undefined> {
    type: IPlotType;
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

    renderCells = (data: ISolution) => (
        _.map(data, (value, key) => <Cell fill={chartsColors[key] || barColor} key={`cell-${key}`}/>)
    )

    renderBar = (data: ISolution) => (
        <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="value" fill={barColor} maxBarSize={100}>
                {this.renderCells(data)}
            </Bar>
        </BarChart>
    )

    renderPie = (data: ISolution) => (
        <PieChart width={600} height={300}>
            <Pie dataKey="value" data={data} fill={barColor}>
                {this.renderCells(data)}
            </Pie>
            <Tooltip/>
       </PieChart>
    )

    renderPlot = (type: IPlotType, data: ISolution) => {
        if (type === PlotType.pie) {
            return this.renderPie(data);
        }
        if (type === PlotType.bar) {
            return this.renderBar(data);
        }
    }

    render() {
        return (
            <div className={this.props.className || defaultClassName} id={this.props.id}>
                {this.renderPlot(this.props.type, this.state.data)}
            </div>
        )
    }
}