import {
    uniqueStringType
} from './constants';

let counter = 0;
function getRandomStr() {
    // Math.random().toString(32).slice(2, 2 + length)
    return counter++;
}

export function uniqueId(prefix: number | string = '', length: number = 6): string {
    return prefix + '_' + getRandomStr();
}

export function uniqueUpdateId(): string {
    return uniqueId(uniqueStringType.UPDATE);
}