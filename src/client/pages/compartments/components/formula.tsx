import { StatefulFormControl } from '../../../components/statefulInput';
import { IFormula } from '../../../redux/reducers/formulas';
import * as React from 'react';
const MathJax = require('react-mathjax');

interface IFormulaProps {
    formula: IFormula;
    modifyFormula: (modify: (formula: IFormula) => void) => void;
}

interface IFormulaState {
    editable: boolean
}

export class Formula extends React.PureComponent<IFormulaProps, IFormulaState> {
    constructor(props: IFormulaProps) {
        super(props);
        this.state = {
            editable: true
        }
    }

    modifyText = (text: string) => {
        this.props.modifyFormula(x => x.text = text );
        this.setState({editable: false});
    }

    setEditable = () => this.setState({editable: true});

    render() {
        const {formula} = this.props;
        return (
            <div>
                {
                    this.state.editable
                    ? <StatefulFormControl value={formula.text} onSubmit={this.modifyText} />
                    : <div onClick={this.setEditable}>
                        <MathJax.Context>
                            <MathJax.Node inline>{formula.text}</MathJax.Node>
                        </MathJax.Context>
                    </div>
                }
            </div>
        );
    }
}