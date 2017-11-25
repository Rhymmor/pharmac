import * as React from 'react';
import { IIdentifiabilityOptions, IdentifiabilityMethods } from '../../../../redux/reducers/solvers/identifiability';
import { Modifier, Translate } from '../../../../utils/utils';
import { BoxHeader } from '../../../../components/layout';
import { Dropdown } from '../../../../components/Dropdown';
import { UseStrings } from '../../../../../lib/utils';

interface IProps {
    options: IIdentifiabilityOptions;
    modifyOptions: (modify: Modifier<IIdentifiabilityOptions>) => void;
    translate: Translate;
}

interface IState {
}

function getMethodsText(translate: Translate): UseStrings<IdentifiabilityMethods, string> {
    return {
        Sensitivity: translate('problem.identifiability.method.Sensitivity.name'),
        MonteCarlo: translate('problem.identifiability.method.MonteCarlo.name')
    }
}

function getMethodsTooltip(translate: Translate): UseStrings<IdentifiabilityMethods, string> {
    return {
        Sensitivity: translate('problem.identifiability.method.Sensitivity.tooltip'),
        MonteCarlo: translate('problem.identifiability.method.MonteCarlo.tooltip')
    }
}

export class IdentifiabilityOptions extends React.Component<IProps, IState> {
    private modifyMethod = (value: IdentifiabilityMethods) => this.props.modifyOptions(options => {
        options.method = value;
    });

    render() {
        const {options: {method}, translate} = this.props;
        return (
            <div>
                <BoxHeader>{translate('problem.identifiability.options')}</BoxHeader>
                <div>
                        <Dropdown
                            value={method}
                            names={getMethodsText(translate)}
                            tooltips={getMethodsTooltip(translate)}
                            modify={this.modifyMethod}
                            label={`${translate('problem.identifiability.method.title')}:`}
                        />
                    </div>
            </div>
        );
    }
}
