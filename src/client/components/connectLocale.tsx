import { Languages } from '../redux/store';
import { Translate } from '../utils/utils';
import { IStore } from '../redux/reducers';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import * as React from 'react';
import {connect} from 'react-redux';

export interface WithLocale {
    translate?: Translate;
    currentLanguage?: Languages;
}

function mapStateToProps<T extends WithLocale>(state: IStore): Partial<T> {
    return ({
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    } as any) as Partial<T>;
}

type MapDispatchToPropsObject = {[name: string]: any}

export function connectLocale<T extends WithLocale>(
    reactClass: React.ComponentType<T>, 
    mapDispatchToProps?: MapDispatchToPropsObject
): React.ComponentClass<T> {
    return connect<Partial<T>, any, Partial<T>>(mapStateToProps, mapDispatchToProps)(reactClass) as any;
}