import { connectLocale, WithLocale } from '../../../components/connectLocale';
import { BoxHeader } from '../../../components/layout';
import * as classnames from 'classnames';
import { StatefulFormControl } from '../../../components/statefulInput';
import { isOk, safeGet } from '../../../../lib/utils';
import { IParameters } from '../../../redux/reducers/formulas';
import { Modifier } from '../../../utils/utils';
import { ICommonOptions } from '../../../redux/reducers/solvers';
import * as React from 'react';
import * as _ from 'lodash';
import { Button } from 'react-bootstrap';

interface IModelOptionsProps<T> extends WithLocale {
    modifyOptions: (modify: Modifier<T>) => void;
    options: T;
    solve: () => void;
    isSolveBtnEnable?: boolean;
}

interface IModelOptionsState {
}

class ModelOptions<T extends ICommonOptions> extends React.Component<IModelOptionsProps<T>, IModelOptionsState> {

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
        const {options, solve, isSolveBtnEnable, translate} = this.props;
        return (
            <div>
                <BoxHeader>{translate('title.commonOptions')}</BoxHeader>
                <div>
                    <div className='inline-block'>
                        <span>{translate('problem.common.interval')}:</span>
                        {this.renderInput('interval')}
                        <span>{translate('problem.common.points')}:</span>
                        {this.renderInput('points')}
                    </div>
                    <Button 
                        onClick={solve} 
                        className='inline-block' 
                        disabled={isOk(isSolveBtnEnable) && !isSolveBtnEnable}
                    >
                        {translate('problem.common.solveAction')}
                    </Button>
                </div>
            </div>
        );
    }
}

export default connectLocale(ModelOptions)