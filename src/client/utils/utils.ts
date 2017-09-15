import * as _ from 'lodash';

export type ReactChildren = React.ReactElement<any> | React.ReactElement<any>[];

export function checkArraysLength<T, K>(obj1: T, obj2: K) {
    return _.isArray(obj1) && _.isArray(obj2) && (obj1.length === obj2.length);
}

export function swap<T>(arr: T[], dragIdx: number, dropIdx: number) {
    const newArr = _.cloneDeep(arr);
    const drop = arr[dropIdx];
    newArr[dropIdx] = newArr[dragIdx];
    newArr[dragIdx] = drop;
    return newArr;
}

export type Modifier<T> = (obj: T) => void;
export function modifyTarget<T>(modify: Modifier<T>, obj: T, update: Function): void {
    const newTarget = _.cloneDeep(obj);
    modify(newTarget);
    update(newTarget);
}

export function isEven(num: number) {
    return _.isInteger(num) && (num >> 1) * 2 === num;
}

export function isSameEvenness(num1: number, num2: number) {
    return (isEven(num1) && isEven(num2)) || (!isEven(num1) && !isEven(num2));
}