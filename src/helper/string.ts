import {
    uniqueStringType
} from './constants';

export function uniqueId(prefix: number | string = ''): string {
    return prefix + '_' + Math.random().toString(32).slice(2, 8);
}

export function uniqueUpdateId(): string {
    return uniqueId(uniqueStringType.UPDATE);
}