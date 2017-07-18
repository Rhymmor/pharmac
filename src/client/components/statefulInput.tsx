import { safeEval, safeGet } from '../../lib/utils';
import * as React from 'react'; 
import { FormControl, FormGroup } from "react-bootstrap"; 
 
export interface StatefulFormControlProps { 
    className?: string; 
    type?: "text" | "number" | "textarea"; 
    value: any; // type/number 
    placeholder?: string; // showed instead of '' 
    controlId?: string; // required for validator 
    onSubmit(value: any): boolean | void; // type/number 
    formatter?(value: any): any; 
    parser?(text: any): any; 
    validator?(text: any): boolean; 
    rows?: number;  //textarea only 
} 
 
export interface StatefulFormControlState { 
    text: string; 
} 
 
/** Input component, which allows using custom parser/formatter 
 * value is confirmed on focus lost 
 */ 
export class StatefulFormControl extends React.Component<StatefulFormControlProps, StatefulFormControlState> { 
 
    static toText(props: StatefulFormControlProps) { 
        const formatter = props.formatter || (x=>x); 
        return safeGet(props, x=>formatter(x.value), ''); 
    } 
 
    constructor(props: StatefulFormControlProps) { 
        super(props); 
        this.state = { 
            text: StatefulFormControl.toText(props) 
        }; 
    } 
 
    componentWillReceiveProps(nextProps: StatefulFormControlProps) { 
        if (nextProps.value !== this.props.value) { 
            this.setState({text: StatefulFormControl.toText(nextProps)}); 
        } 
    } 
 
    onChange = (e: any) => { 
        this.setState({text: e.currentTarget.value}); 
    } 
 
    onSubmit = (e: any) => { 
        const parser = this.props.parser || ( x => x ); 
        const formatter = this.props.formatter || (x=>x); 
        try { 
            const pval = parser(this.state.text); 
            if (this.props.onSubmit(pval)) { 
                this.setState({text: formatter(pval)}); 
            } else { 
                this.setState({text: formatter(this.props.value)}); 
            } 
        } catch (e) { 
            this.setState({text: StatefulFormControl.toText(this.props)}); 
        } 
    } 
 
    _handleKeyPress = (e: any) => { 
        if (e.key === 'Enter') { 
            this.onSubmit(null); 
        } 
    } 
 
    render() { 
        const {type, className, validator, controlId, placeholder, rows} = this.props; 
        const {text} = this.state; 
        const commonProps = { 
            value: safeEval(()=>text, ''), 
            onChange: this.onChange, 
            onBlur: this.onSubmit, 
            placeholder, 
            className: className || '' 
        }; 
        if (type === 'textarea') { 
            return ( 
                <textarea {...commonProps} rows={rows || 2}/> 
            ); 
        } 
        const formControl = <FormControl 
            type={type} 
            className={className || ''} 
            value={safeEval(()=>text, '')} 
            placeholder={placeholder} 
            onChange={this.onChange} 
            onKeyPress={this._handleKeyPress} 
            onBlur={this.onSubmit} 
        /> 
        if (!validator) { 
            return formControl; 
        } 
        let validationState: "warning" | "error"; 
        try { 
            validationState = validator(text) ? null : 'error'; 
        } catch (e) { 
            validationState = "error"; 
        } 
        return ( 
            <FormGroup controlId={controlId} validationState={validationState}> 
                {formControl} 
            </FormGroup> 
        ); 
    } 
} 
 
export function NumInput(props: StatefulFormControlProps) { 
    return <StatefulFormControl 
        type="number" 
        formatter={(x=>x)} 
        parser={parseInt} 
        {...props} 
    />; 
}