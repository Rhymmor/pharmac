import { Modifier } from '../../../../utils/utils';
import { UseStrings } from '../../../../../lib/utils';
import { BoxHeader } from '../../../../components/layout';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import * as React from 'react';
import * as classnames from 'classnames';
import {
    IInverseProblemOptions,
    IInverseProblemSolution,
    IInverseProblemSolutionParameters,
    IInverseProblemStore,
    InverseProblemDataSelection,
    InverseProblemDataSelectionType,
    InverseProblemMethods,
    InverseProblemMethodsType,
    validateInverseProblemData,
} from '../../../../redux/reducers/solvers/inverse-problem';
import * as _ from 'lodash';

interface IProps {
    options: IInverseProblemOptions;
    modifyOptions: (modify: Modifier<IInverseProblemOptions>) => void;
}

interface IState {
}

const DataSelectionText: UseStrings<InverseProblemDataSelectionType, string> = {
    Synthetic: "Synthetic data",
    Experimental: "Experimental data"
};

const MethodsText: UseStrings<InverseProblemMethodsType, string> = {
    NelderMead: "Nelder-Mead",
    BFGS: "BFGS",
    Powell: "Powell",
    CG: "Conjugate gradient",
    "L-BFGS-B": "L-BFGS-B",
    TNC: "Truncated Newton",
    COBYLA: "COBYLA",
    SLSQP: "SLSQP"
};

const MethodsTooltip: UseStrings<InverseProblemMethodsType, string> = {
    NelderMead: "Nelder-Mead simplex method",
    BFGS: "Broyden–Fletcher–Goldfarb–Shanno algorithm",
    Powell: "Powell's conjugate direction method",
    CG: "Conjugate gradient method",
    "L-BFGS-B": "Limited-memory Broyden–Fletcher–Goldfarb–Shanno algorithm for bound-constrained optimization",
    TNC: "Truncated Newton (TNC) method",
    COBYLA: "Constrained optimization by linear approximation",
    SLSQP: "Sequential quadratic programming"
};

export class InverseProblemOptions extends React.Component<IProps, IState> {
    modifyMethod = (value: InverseProblemMethodsType) => this.props.modifyOptions(options => {
        options.method = value;
    });
    modifyDataSelection = (value: InverseProblemDataSelectionType) => this.props.modifyOptions(options => {
        options.dataSelection = value;
    });
    
    renderMethodItems = () => _.map(InverseProblemMethods, (value, key) => (
        <MenuItem 
            key={key}
            onClick={() => this.modifyMethod(value)}
        >
            <span title={MethodsTooltip[value]}>{MethodsText[value]}</span>
        </MenuItem>
    ));

    renderMethodsDropdown = (method: InverseProblemMethodsType) => (
        <div className={classnames("methods-dropdown", "inline-block")} title={MethodsTooltip[method]}>
            <span>Solution method:</span>
            <DropdownButton
                id="inverseProblemMethods"
                title={MethodsText[method]}
                className={classnames("methods-dropdown-button", "direct-problem-input")}
            >
                {this.renderMethodItems()}
            </DropdownButton>
        </div>
    )

    renderDataSelectionItems = () => _.map(InverseProblemDataSelection, (value, key) => (
        <MenuItem key={key} onClick={() => this.modifyDataSelection(value)}>{DataSelectionText[value]}</MenuItem>
    ));

    renderDataSelectionDropdown = (type: InverseProblemDataSelectionType) => (
        <div className={classnames("methods-dropdown", "inline-block")}>
            <span>Data selection method:</span>
            <DropdownButton
                id="dataSelectionMethods"
                title={DataSelectionText[type]}
                className={classnames("methods-dropdown-button", "direct-problem-input")}
            >
                {this.renderDataSelectionItems()}
            </DropdownButton>
        </div>
    );

    render() {
        const {options} = this.props;
        return (
            <div>
                <BoxHeader>Inverse problem options</BoxHeader>
                <div>
                    {this.renderMethodsDropdown(options.method)}
                    {this.renderDataSelectionDropdown(options.dataSelection)}
                </div>
            </div>
        );
    }
}
