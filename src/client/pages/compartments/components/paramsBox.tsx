import { StatefulFormControl } from '../../../components/statefulInput';
import { safeGet } from '../../../../lib/utils';
import { Modifier } from '../../../utils/utils';
import { IParameters } from '../../../redux/reducers/formulas';
import * as React from 'react';
import * as _ from 'lodash';
const MathJax = require('react-mathjax');

interface IParamsBoxProps {
    label: string
    params: IParameters;
    modifyParams: (modify: Modifier<IParameters>) => void;
}

interface IParamsBoxState {
}

export class ParamsBox extends React.PureComponent<IParamsBoxProps, IParamsBoxState> {
    modifyParam = (key: string) => (value: number) => {
        this.props.modifyParams(params => params[key] = value);
    }

    renderParam = (key: string) => {
        return (
            <div key={key}>
                <MathJax.Context>
                    <MathJax.Node inline>{key}</MathJax.Node>
                </MathJax.Context>
                <StatefulFormControl
                    className='inline-block param-input'
                    value={safeGet(this.props.params, x => x[key])} 
                    parser={Number} 
                    onSubmit={this.modifyParam(key)}
                />
            </div>
        );
    }

    render() {
        const {params, label} = this.props;
        return (
            <div>
                <span>{label}</span>
                {_.map(params, (val, key) => this.renderParam(key))}
            </div>
        );
    }
}