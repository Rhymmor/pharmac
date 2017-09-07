import * as classnames from 'classnames';
import { StatefulFormControl } from '../../../components/statefulInput';
import { safeGet } from '../../../../lib/utils';
import { IParameters } from '../../../redux/reducers/formulas';
import { Modifier } from '../../../utils/utils';
import { ICommonOptions } from '../../../redux/reducers/solvers';
import * as React from 'react';
import * as _ from 'lodash';

interface IModelOptionsProps<T> {
    modifyOptions: (modify: Modifier<T>) => void;
    options: T;
    className?: string;
}

interface IModelOptionsState {
}

export class ModelOptions<T extends ICommonOptions> extends React.Component<IModelOptionsProps<T>, IModelOptionsState> {

    modifyOptionKey = (key: keyof T) => {
        return (value: any) => {    //TODO: Typescript bug
            this.props.modifyOptions((options) => {
                options[key] = value > 0 && _.isInteger(value) ? value : null
            });
        }
    }

    renderInput = (key: keyof T) => (
        <StatefulFormControl
            className='inline-block direct-problem-input'   //TODO: get classname from props
            value={safeGet(this.props.options, x => x[key])} 
            parser={Number}
            onSubmit={this.modifyOptionKey(key)}
        />
    )

    render() {
        return (
            <div className={classnames(this.props.className)}>
                <span>Interval:</span>
                {this.renderInput('interval')}
                <span>Points number:</span>
                {this.renderInput('points')}
            </div>
        );
    }
}
