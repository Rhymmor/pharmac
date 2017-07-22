import { getSolution, updateDirectProblemOptions } from '../../redux/actions/direct-problem';
import { IDirectProblemOptions, IDirectProblemSolution } from '../../../lib/common';
import { Modifier, modifyTarget } from '../../utils/utils';
import { IDirectProblemStore } from '../../redux/reducers/direct-problem';
import { DirectProblem } from './components/direct-problem';
import { Model } from './components/model';
import { generateFormula } from '../../utils/formula-utils';
import { Formula } from './components/formula';
import { updateModel } from '../../redux/actions/formulas';
import { IFormula, IModel } from '../../redux/reducers/formulas';
import { IStore } from '../../redux/reducers';
import * as React from 'react';
import {Box, BoxHeader} from '../../components';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import './compartments.scss';

interface ICompartmentsProps {
    dispatch: Function;
    model: IModel;
    directProblem: IDirectProblemStore;
}

interface ICompartmentsState {
    
}

function mapStateToProps(state: IStore, ownProps: any): Partial<ICompartmentsProps> {
    return {
        model: state.model,
        directProblem: state.directProblem
    }
}

class CompartmentsImpl extends React.PureComponent<ICompartmentsProps, ICompartmentsState> {

    modifyModel = (modify: Modifier<IModel>) => {
        modifyTarget(modify, 
            this.props.model,
            (x: IModel) => this.props.dispatch(updateModel(x)));
    }

    modifyOptions = (modify: Modifier<IDirectProblemOptions>) => {
        modifyTarget(modify, 
            this.props.directProblem.options,
            (x: IDirectProblemOptions) => this.props.dispatch(updateDirectProblemOptions(x)));
    }

    solveDirectProblem = () => this.props.dispatch(getSolution({
        model: this.props.model,
        options: this.props.directProblem.options
    }))
    
    render() {
        const {model, directProblem} = this.props;
        return (
            <div className="page-workzone">
                <Model modifyModel={this.modifyModel} model={this.props.model}/>
                <DirectProblem solve={this.solveDirectProblem} modifyOptions={this.modifyOptions} directProblem={directProblem}/>
            </div>
        );
    }
}

export const Compartments: React.ComponentClass<ICompartmentsProps> = connect(mapStateToProps)(CompartmentsImpl);