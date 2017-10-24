import { Box } from '../';
import { setActiveLanguage } from 'react-localize-redux';
import { connectLocale, WithLocale } from '../connectLocale';
import { Languages } from '../../redux/store';
import { UseStrings } from '../../../lib/utils';
import { Dropdown } from '../Dropdown';
import * as React from 'react';
import * as _ from 'lodash';
import './LanguageSelector.scss';

interface IProps extends WithLocale {
    setActiveLanguage?: typeof setActiveLanguage;
}

interface IState {
}

const LanguageNames: Readonly<UseStrings<Languages, string>> = {
    en: 'English',
    ru: 'Russian'
}

class LanguageSelector extends React.PureComponent<IProps, IState> {

    render() {
        const {currentLanguage, setActiveLanguage} = this.props;
        return (
            <Dropdown 
                className='language-selector'
                value={currentLanguage}
                names={LanguageNames}
                modify={setActiveLanguage}
            />
        );
    }
}

const connectDispatchToProps = {setActiveLanguage};

export default connectLocale(LanguageSelector, connectDispatchToProps);