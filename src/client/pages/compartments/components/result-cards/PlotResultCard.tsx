import { ImageSave } from '../save-results/ImageSave';
import { ResultCard } from './ResultCard';
import * as React from 'react';

interface IProps {
    label: string;
    id: string;
}

interface IState {
}

export class PlotResultCard extends React.Component<IProps, IState> {

    render() {
        const {children, label, id} = this.props;
        return (
            <ResultCard
                label={label}
                SaveButton={<ImageSave parentId={id}/>}
            >
                {children}
            </ResultCard>
        );
    }
}
