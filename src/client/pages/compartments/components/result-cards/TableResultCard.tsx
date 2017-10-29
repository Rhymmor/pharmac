import { TableSave } from '../save-results/TableSave';
import { KeyValueType } from '../table/KeyValueTable';
import { ResultCard } from './ResultCard';
import * as React from 'react';

interface IProps {
    label: string;
    parameters: KeyValueType[];
}

interface IState {
}

export class TableResultCard extends React.Component<IProps, IState> {

    render() {
        const {label, parameters, children} = this.props;
        return (
            <ResultCard
                label={label}
                SaveButton={<TableSave parameters={parameters}/>}
            >
                {children}
            </ResultCard>
        );
    }
}
