import { getSolution, updateDirectProblemOptions } from '../../redux/actions/direct-problem';
import { IDirectProblemOptions, IDirectProblemSolution } from '../../../lib/common';
import { Modifier, modifyTarget } from '../../utils/utils';
import { IDirectProblemStore } from '../../redux/reducers/direct-problem';
import { DirectProblem } from './components/direct-problem';
import { Model } from './components/model';
import { generateFormula } from '../../utils/formula-utils';
import { Formula } from './components/formula';
import { updateModel, updateParameters } from '../../redux/actions/formulas';
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
}

interface ICompartmentsState {
    activeTab: number
}

function mapStateToProps(state: IStore, ownProps: any): Partial<ICompartmentsProps> {
    return {
        modelStore: state.model,
        directProblem: state.directProblem
    }
}

const PARAMETER_REGEX = /[a-zA-Z]+[_\{\}0-9]*/g;    //TODO: change to more reliable method
const FUNCTION_REGEX = /x_\{[0-9]+\}/;
const isFunctionSymbol = (str: string) => FUNCTION_REGEX.test(str);
const isParameter = (str: string) => !Number(str) && !isFunctionSymbol(str);

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
            (x: IModel) => this.props.dispatch(updateModel(x)));
    }

    modifyOptions = (modify: Modifier<IDirectProblemOptions>) => {
        modifyTarget(modify, 
            this.props.directProblem.options,
            (x: IDirectProblemOptions) => this.props.dispatch(updateDirectProblemOptions(x)));
    }

    solveDirectProblem = () => this.props.dispatch(getSolution({
        model: this.props.modelStore.model,
        options: this.props.directProblem.options,
        params: this.props.modelStore.parameters
    }));

    checkParameters = (formula: string) => {
        const matches = _.filter(formula.match(PARAMETER_REGEX), isParameter);
        let isChanged = false;
        if (matches) {
            const params = _.cloneDeep(this.props.modelStore.parameters);
            for (const match of matches) {
                if (!_.isFinite(params[match])) {
                    params[match] = 0;
                    isChanged = true;
                }
            }
            if (isChanged) {
                this.props.dispatch(updateParameters(params));
            }
        }
    }
    
    modifyParams = (modify: Modifier<IParameters>) => {
        modifyTarget(modify, 
            this.props.modelStore.parameters,
            (x: IParameters) => this.props.dispatch(updateParameters(x)));
    }

    handleSelectTab = (selectedKey: number) => {
        this.setState({activeTab: selectedKey});
    }

    renderTab = (active: number) => {
        switch (active) {
            case Tabs.DIRECT:
                return this.renderDirect();
            default:
                return;
        }
    }

    renderDirect = () => {
        const {directProblem, modelStore: {parameters}} = this.props;
        return (
            <DirectProblem 
                solve={this.solveDirectProblem} 
                modifyOptions={this.modifyOptions} 
                directProblem={directProblem}
                params={parameters}
                modifyParams={this.modifyParams}
            />
        );
    }

    render() {
        const {modelStore: {model}, directProblem} = this.props;
        const {activeTab} = this.state;
        return (
            <div className="page-workzone">
                <Model modifyModel={this.modifyModel} model={model} checkNewParams={this.checkParameters}/>
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