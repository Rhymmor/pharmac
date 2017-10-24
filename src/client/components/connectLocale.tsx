import { Translate } from '../utils/utils';
import { IStore } from '../redux/reducers';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import * as React from 'react';
import {connect} from 'react-redux';

export interface WithLocale {
    translate?: Translate;
    currentLanguage?: string;
}

function mapStateToProps<T extends WithLocale>(state: IStore): Partial<T> {
    return ({
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    } as any) as Partial<T>;
}

export function connectLocale<T extends WithLocale>(reactClass: React.ComponentType<T>): React.ComponentClass<T> {
    return connect<Partial<T>, any, Partial<T>>(mapStateToProps)(reactClass) as any;
}