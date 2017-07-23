import { StatefulFormControl } from '../../../components/statefulInput';
import { IFormula } from '../../../redux/reducers/formulas';
import * as React from 'react';
import {Row, Col} from 'react-bootstrap';
const MathJax = require('react-mathjax');

function getFormulaHead(idx: number) {
    return `\\frac{dx_{${idx}}}{dt} = `;
}

function getInitialValueHead(idx: number) {
    return `x_{${idx}}(0) = `;
}

interface IFormulaProps {
    idx: number;
    formula: IFormula;
    modifyFormula: (modify: (formula: IFormula) => void) => void;
    checkNewParams: (formula: string) => void;
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

    modifyText = (text: string, e: Event) => {
        this.props.modifyFormula(x => x.text = text );
        this.props.checkNewParams(text);
        if (e.type === "keypress") {
            this.setState({editable: false});
        }
    }

    modifyInitialValue = (num: number) => {
        this.props.modifyFormula(x => x.initialValue = num);
    }

    setEditable = () => this.setState({editable: true});

    render() {
        const {formula, idx} = this.props;
        return (
            <Row className='formula-row'>
                <Col xs={6}>
                    <div className='formula-text-head'>
                        <MathJax.Context>
                            <MathJax.Node inline>{getFormulaHead(idx)}</MathJax.Node>
                        </MathJax.Context>
                    </div>
                    <div className='formula-text'>
                        {
                            this.state.editable
                            ? <StatefulFormControl value={formula.text} onSubmit={this.modifyText} autofocus/>
                            : <div onClick={this.setEditable}>
                                <MathJax.Context>
                                    <MathJax.Node inline>{formula.text}</MathJax.Node>
                                </MathJax.Context>
                            </div>
                        }
                    </div>
                </Col>
                <Col xs={6}>
                    <div className='formula-text-head'>
                        <MathJax.Context>
                            <MathJax.Node inline>{getInitialValueHead(idx)}</MathJax.Node>
                        </MathJax.Context>
                    </div>
                    <StatefulFormControl className="formula-value" value={formula.initialValue} parser={x => +x} onSubmit={this.modifyInitialValue} />
                </Col>
            </Row>
        );
    }
}