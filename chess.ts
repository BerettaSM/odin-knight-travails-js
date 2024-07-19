import type { PieceConfig, Position } from './types';

import { LinkedList } from './linked-list';
import {
    getValidMoves,
    isSamePosition,
    isValidPosition,
    reconstructPath,
} from './helpers';

export abstract class Piece {
    public position: Position;
    public lastPosition: Piece | null;

    constructor(config?: PieceConfig) {
        this.position = config?.position ?? [0, 0];
        this.lastPosition = config?.lastPosition ?? null;
    }

    abstract move(position: Position): Piece;

    abstract getMovimentationOffsets(): Position[];

    get token() {
        const [x, y] = this.position;
        return `P[${x},${y}]`;
    }

    toString() {
        return 'Piece';
    }
}

export class Knight extends Piece {
    getMovimentationOffsets(): Position[] {
        return [
            [-2, 1],
            [-1, 2],
            [2, 1],
            [1, 2],
            [-2, -1],
            [-1, -2],
            [2, -1],
            [1, -2],
        ];
    }

    move(position: Position): Knight {
        return new Knight({
            position,
            lastPosition: this,
        });
    }

    toString() {
        return 'Knight';
    }
}

export function pieceMoves(piece: Piece, to: Position) {
    if (![piece.position, to].every(isValidPosition))
        throw new Error('Invalid board position passed in.');
    const queue = new LinkedList<Piece>(piece);
    const visited = new Set<string>();
    while (!queue.isEmpty()) {
        const move = queue.shift()!;
        if (isSamePosition(move.position, to)) return reconstructPath(move);
        if (visited.has(move.token)) continue;
        visited.add(move.token);
        getValidMoves(move).forEach((move) => queue.append(move));
    }
    return null;
}
