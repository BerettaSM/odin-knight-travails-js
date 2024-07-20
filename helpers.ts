import type { Position } from './types';

import { Piece } from './chess';

export function isValidPosition(position: Position) {
    const [x, y] = position;
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export function isSamePosition(pos1: Position, pos2: Position) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

export function generateMove(position: Position, offset: Position): Position {
    const [posX, posY] = position;
    const [offsetX, offsetY] = offset;
    return [posX + offsetX, posY + offsetY];
}

function getPositionDelta([x1, y1]: Position, [x2, y2]: Position) {
    const deltaX = Math.abs(x1 - x2);
    const deltaY = Math.abs(y1 - y2);
    return deltaX + deltaY;
}

/**
 * Returns a function that should be passed to
 * Array.prototype.sort. Will sort an array of
 * positions according to proximity to a destination
 * position.
 *
 * @param destination
 * @returns a function to be passed to Array.prototype.sort
 */
export function byProximityTo(destination: Position) {
    return function (a: Position, b: Position): number {
        const aDelta = getPositionDelta(a, destination);
        const bDelta = getPositionDelta(b, destination);
        return aDelta - bDelta;
    };
}

export function getValidMoves<P extends Piece>(piece: P) {
    const offsets = piece.getMovimentationOffsets();
    return offsets
        .map((offset) => generateMove(piece.position, offset))
        .filter(isValidPosition)
        .map((pos) => piece.move(pos));
}

export function reconstructPath<P extends Piece>(piece: P): Position[] {
    let currentPiece: Piece | null = piece;
    const path: Position[] = [];
    while (currentPiece !== null) {
        path.push([...currentPiece.position]);
        currentPiece = currentPiece.lastPosition;
    }
    return path.reverse();
}
