import type { Position } from "./types";

import { Piece } from "./chess";

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