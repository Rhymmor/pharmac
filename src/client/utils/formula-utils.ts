import { IFormula } from '../redux/reducers/formulas';
import {generate} from 'shortid';

export function generateFormula(): IFormula {
    return {
        id: generate(),
        text: ''
    }
}