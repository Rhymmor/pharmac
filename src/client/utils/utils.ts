import * as _ from 'lodash';


export type Modifier<T> = (obj: T) => void;
export function modifyTarget<T>(modify: Modifier<T>, obj: T, update: Function): void {
    const newTarget = _.cloneDeep(obj);
    modify(newTarget);
    update(newTarget);
}