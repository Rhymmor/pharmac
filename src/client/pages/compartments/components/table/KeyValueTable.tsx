import { isOk } from '../../../../../lib/utils';
import { IParameters } from '../../../../redux/reducers/formulas';
import * as React from 'react';
import * as _ from 'lodash';
const MathJax = require('react-mathjax');
import './ParametersTable.scss';

type KeyValueType = {
    key: string,
    value: number | string
};

interface IParametersTableProps {
    parameters: KeyValueType[];
    mathJax?: boolean;
}

interface IParametersTableState {
}

export class KeyValueTable extends React.Component<IParametersTableProps, IParametersTableState> {

    renderName = (name: string) => {
        if (this.props.mathJax) {
            return (
                <MathJax.Context>
                    <MathJax.Node inline>{name}</MathJax.Node>
                </MathJax.Context>
            );
        }
        return <span>{name}</span>;
    }

    renderRow = (name: string, value: number | string) => (
        <tr key={name}>
            <td>
                {this.renderName(name)}
            </td>
            <td>{isOk(value) ? value : '-'}</td>
        </tr>
    )

    renderBody = (parameters: KeyValueType[]) => {
        return _.map(parameters, pair => this.renderRow(pair.key, pair.value));
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

