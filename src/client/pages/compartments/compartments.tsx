import { ICommonOptions } from '../../redux/reducers/solvers';
import { ModelOptions } from './components/ModelOptions';
import {
    getInverseSolution,
    updateInverseProblemOptions,
    updateInverseProblemParameters
} from '../../redux/actions/solvers/inverse-problem';
import { InverseProblem } from './components/inverse-problem/inverse-problem';
import { IInverseProblemStore } from '../../redux/reducers/solvers/inverse-problem';
import { getIdentifiabilitySolution, updateIdentifiabilityOptions } from '../../redux/actions/solvers/identifiability';
import { IdentifiabilityProblem } from './components/identifiability/identifiability';
import { IIdentifiabilityStore } from '../../redux/reducers/solvers/identifiability';
import { getDirectSolution, updateDirectProblemOptions } from '../../redux/actions/solvers/direct-problem';
import { Modifier, modifyTarget } from '../../utils/utils';
import { IDirectProblemStore, IDirectProblemOptions, IDirectProblemSolution } from '../../redux/reducers/solvers/direct-problem';
import { DirectProblem } from './components/direct-problem/direct-problem';
import Model from './components/model';
import { generateFormula } from '../../utils/formula-utils';
import {
    checkAndUpdateModel,
    updateAllParameters,
    updateAllParametersNames,
    updateModel,
    updateModelParameterNames,
    updateModelParameters,
} from '../../redux/actions/formulas';
import { IFormula, IModel, IModelStore, IParameters } from '../../redux/reducers/formulas';
import { IStore } from '../../redux/reducers';
import * as React from 'react';
import {Box, BoxHeader} from '../../components';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {Nav, NavItem} from 'react-bootstrap';
import './compartments.scss';

interface ICompartmentsProps {
    dispatch: Function;
    modelStore: IModelStore;
    directProblem: IDirectProblemStore;
    identifyStore: IIdentifiabilityStore;
    inverseProblem: IInverseProblemStore;
}

interface ICompartmentsState {
    activeTab: number
}

function mapStateToProps(state: IStore, ownProps: any): Partial<ICompartmentsProps> {
    return {
        modelStore: state.model,
        directProblem: state.directProblem,
        identifyStore: state.identifiability,
        inverseProblem: state.inverseProblem
    }
}

enum Tabs {
    DIRECT = 0,
    IDENTIFY,
    INVERSE
}

class CompartmentsImpl extends React.PureComponent<ICompartmentsProps, ICompartmentsState> {
    constructor(props: ICompartmentsProps) {
        super(props);
        this.state = {
            activeTab: 0
        }
    }

    modifyModel = (modify: Modifier<IModel>) => {
        modifyTarget(modify, 
            this.props.modelStore.model,
            (x: IModel) => this.props.dispatch(checkAndUpdateModel(x)));
    }

    modifyOptions = <T extends ICommonOptions>(options: T, update: Function) => (modify: Modifier<T>) => {
        modifyTarget(modify,
            options,
            (x: T) => this.props.dispatch(update(x)));
    }

    solveDirectProblem = (callback?: Function) => this.props.dispatch(getDirectSolution({
        model: this.props.modelStore.model,
        options: this.props.directProblem.options,
        params: this.props.modelStore.parameters
    }, callback));

    solveIdentifyProblem = (callback?: Function) => this.props.dispatch(getIdentifiabilitySolution({
        model: this.props.modelStore.model,
        options: this.props.identifyStore.options,
        params: this.props.modelStore.parameters
    }, callback));

    solveInverseProblem = (callback?: Function) => this.props.dispatch(getInverseSolution({
        model: this.props.modelStore.model,
        options: this.props.inverseProblem.options,
        params: this.props.modelStore.parameters
    }, callback));
    
    modifyParams = (modify: Modifier<IParameters>) => {
        modifyTarget(modify, 
            this.props.modelStore.parameters,
            (x: IParameters) => this.props.dispatch(updateModelParameters(x)));
    }

    handleSelectTab = (selectedKey: number) => {
        this.setState({activeTab: selectedKey});
    }

    renderTab = (active: number) => {
        switch (active) {
            case Tabs.DIRECT:
                return this.renderDirect();
            case Tabs.IDENTIFY:
                return this.renderIdentify();
            case Tabs.INVERSE:
                return this.renderInverse();
            default:
                return;
        }
    }

    renderDirect = () => {
        const {directProblem, modelStore: {parameters}, dispatch} = this.props;
        return (
            <DirectProblem 
                solve={this.solveDirectProblem}
                modifyOptions={this.modifyOptions(directProblem.options, updateDirectProblemOptions)}
                problem={directProblem}
                params={parameters}
                modifyParams={this.modifyParams}
                dispatch={dispatch}
            />
        );
    }

    renderIdentify = () => {
        const {identifyStore, modelStore: {parameters}, dispatch} = this.props;
        return (
            <IdentifiabilityProblem
                solve={this.solveIdentifyProblem} 
                modifyOptions={this.modifyOptions(identifyStore.options, updateIdentifiabilityOptions)} 
                problem={identifyStore}
                params={parameters}
                modifyParams={this.modifyParams}
                dispatch={dispatch}
            />
        );
    }

    renderInverse = () => {
        const {inverseProblem, modelStore: {parameters}, dispatch} = this.props;
        return (
            <InverseProblem
                solve={this.solveInverseProblem} 
                modifyOptions={this.modifyOptions(inverseProblem.options, updateInverseProblemOptions)} 
                problem={inverseProblem}
                params={parameters}
                modifyParams={this.modifyParams}
                dispatch={dispatch}
            />
        );
    }

    render() {
        const {modelStore: {model}, directProblem} = this.props;
        const {activeTab} = this.state;
        return (
            <div className="page-workzone">
                <Model modifyModel={this.modifyModel} model={model}/>
                <Nav bsStyle="tabs" activeKey={activeTab} onSelect={(num: any) => this.handleSelectTab(num)} className="compart-nav">
                    <NavItem eventKey={Tabs.DIRECT}>
                        <span>Direct problem</span>
                    </NavItem>
                    <NavItem eventKey={Tabs.IDENTIFY}>
                        <span>Identifiability</span>
                    </NavItem>
                    <NavItem eventKey={Tabs.INVERSE}>
                        <span>Inverse problem</span>
                    </NavItem>
                </Nav>
                {this.renderTab(activeTab)}
            </div>
        );
    }
}

export const Compartments: React.ComponentClass<ICompartmentsProps> = connect(mapStateToProps)(CompartmentsImpl);