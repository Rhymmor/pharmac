import { IFormula } from '../redux/reducers/formulas';
import {generate} from 'shortid';

export function getDefaultFormula(idx: number) {
    return generateFormula(`x_{${idx}}`);
}

export function generateFormula(formula?: string): IFormula {
    const text = formula || '';
    return {
        id: generate(),
        text,
        initialValue: 0
    }
}