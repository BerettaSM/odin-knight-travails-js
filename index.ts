import type { PieceConstructor } from './types';
import { Knight, pieceMoves } from './chess';

const pieces: Record<string, PieceConstructor> = {
    Knight,
};

for (const [name, ChessPiece] of Object.entries(pieces)) {
    const piece = new ChessPiece({ position: [0, 0] });

    console.log(name, pieceMoves(piece, [5, 5]));
}
