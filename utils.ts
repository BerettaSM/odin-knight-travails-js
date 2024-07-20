import type { Position } from './types';

export function randomNumber(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

export function getRandomPosition(): Position {
    return [randomNumber(0, 7), randomNumber(0, 7)];
}
