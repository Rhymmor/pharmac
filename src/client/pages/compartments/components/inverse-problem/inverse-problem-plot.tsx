import {IInverseProblemSolution, IInverseProblemOptions} from '../../../../redux/reducers/solvers/inverse-problem';
import * as React from 'react';
import * as _ from 'lodash';
const {BarChart, Bar, XAxis, YAxis, Tooltip, Legend} = require('recharts');

interface IProps {
    solution: IInverseProblemSolution;
}

interface IState {
    data: ISolutionData[];
}

interface ISolutionData {
    name: string;
    value: number;
}

function configureChartData(solution: IInverseProblemSolution): ISolutionData[] {
    return _.map(solution.solution, (value, key) => {
        return {name: key, value};
    });
}

export class InverseProblemPlot extends React.PureComponent<IProps, IState> {
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
                <Bar dataKey="value" fill="#8884d8"/>
            </BarChart>
        );
    }
}
