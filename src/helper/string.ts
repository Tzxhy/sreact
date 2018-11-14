export function uniqueId(): string {
    return Math.random().toString(32).slice(2, 8);
}