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
}

interface ICompartmentsState {
    
}

function mapStateToProps(state: IStore, ownProps: any): Partial<ICompartmentsProps> {
    return {
        model: state.model
    }
}

class CompartmentsImpl extends React.PureComponent<ICompartmentsProps, ICompartmentsState> {

    modifyModel = (modify: (model: IModel) => void) => {
        const newModel = _.cloneDeep(this.props.model);
        modify(newModel);
        this.props.dispatch(updateModel(newModel));
    }

    render() {
        return (
            <div className="page-workzone">
                <Model modifyModel={this.modifyModel} model={this.props.model}/>
                <DirectProblem model={this.props.model}/>
            </div>
        );
    }
}

export const Compartments: React.ComponentClass<ICompartmentsProps> = connect(mapStateToProps)(CompartmentsImpl);