import { IParameters } from '../../../../redux/reducers/formulas';
import * as React from 'react';
import * as _ from 'lodash';
const MathJax = require('react-mathjax');
import './ParametersTable.scss';

interface IParametersTableProps {
    parameters: IParameters;
}

interface IParametersTableState {
}

export class ParametersTable extends React.Component<IParametersTableProps, IParametersTableState> {

    renderRow = (name: string, value: number) => (
        <tr key={name}>
            <td>
                <MathJax.Context>
                    <MathJax.Node inline>{name}</MathJax.Node>
                </MathJax.Context>
            </td>
            <td>{value}</td>
        </tr>
    )

    renderBody = (parameters: IParameters) => {
        return _.map(parameters, (value, name) => this.renderRow(name, value));
    }

    render() {
        const {parameters} = this.props;
        return (
            <div className='param-table-div'>
                <table className='params-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody(parameters)}
                    </tbody>
                </table>
            </div>
        );
    }
}

