import { Translate } from '../../../utils/utils';
import { IStore } from '../../../redux/reducers';
import { BoxHeader } from '../../../components/layout';
import { Box } from '../../../components';
import { Formula } from './formula';
import { generateFormula, getDefaultFormula } from '../../../utils/formula-utils';
import { IFormula, IModel } from '../../../redux/reducers/formulas';
import * as React from 'react';
import * as _ from 'lodash';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import {connect} from 'react-redux';

interface IModelProps {
    translate?: Translate;
    currentLanguage?: string;
    model: IModel;
    modifyModel: (modify: (model: IFormula[]) => void) => void;
}

interface IModelState {
}

function mapStateToProps(state: IStore): Partial<IModelProps> {
    return {
        translate: getTranslate(state.locale) as any,
        currentLanguage: getActiveLanguage(state.locale).code
    };
}

class Model extends React.PureComponent<IModelProps, IModelState> {
    
    modifyFormula = (id: string) => (modify: (formula: IFormula) => void) => {
        this.props.modifyModel((model: IModel) => {
            for (let i = 0; i < model.length; i++) {
                if (model[i].id === id) {
                    model[i] = _.cloneDeep(model[i]);
                    modify(model[i]);
                    if (!model[i]) {
                        model.splice(i, 1);
                    }
                    break;
                }
            }
        })
    }

    addFormula = () => {
        this.props.modifyModel(model => {
            model.push(getDefaultFormula(model.length + 1));
        })
    }

    render() {
        return (
            <Box>
                <BoxHeader>
                    {this.props.translate('title.model')}
                </BoxHeader>
                <div className='model-body'>
                    {
                        _.map(this.props.model, (formula, idx) => (
                            <Formula key={formula.id}
                                idx={idx + 1}
                                formula={formula}
                                modifyFormula={this.modifyFormula(formula.id)} 
                            />
                        ))
                    }
                    <Box onClick={this.addFormula} className='add-formula-btn'>
                        <span className="fa fa-plus"></span>
                    </Box>
                </div>
            </Box>
        );
    }
}

export default connect<Partial<IModelProps>, any, IModelProps>(mapStateToProps)(Model as any);
