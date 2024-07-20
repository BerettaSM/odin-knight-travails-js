import type { Position } from './types';

export function randomNumber(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

export function getRandomPosition(): Position {
    return [randomNumber(0, 7), randomNumber(0, 7)];
}

export function range(endExclusive: number): number[];
export function range(startInclusive: number, endExclusive: number): number[];
export function range(
    startInclusive: number,
    endExclusive: number,
    step: number
): number[];
export function range(
    startInclusive: number,
    endExclusive?: number,
    step: number = 1
): number[] {
    if (endExclusive === undefined) {
        endExclusive = startInclusive;
        startInclusive = 0;
    }
    const result: number[] = [];
    const isIncrementing = startInclusive < endExclusive;
    if (step === 0) {
        console.warn('You passed in zero as step value. Defaulting to 1.');
        step = 1;
    }
    if ((isIncrementing && step < 0) || (!isIncrementing && step > 0)) {
        step *= -1;
    }
    for (
        let i = startInclusive;
        isIncrementing ? i < endExclusive : i > endExclusive;
        i += step
    ) {
        result.push(i);
    }
    return result;
}
