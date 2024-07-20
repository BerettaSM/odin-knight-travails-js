import type { PieceConstructor } from './types';
import { Knight, pieceMoves } from './chess';
import { getRandomPosition } from './utils';

const pieces: Record<string, PieceConstructor> = {
    Knight,
};

for (const [name, ChessPiece] of Object.entries(pieces)) {
    const from = getRandomPosition();
    const to = getRandomPosition();

    console.log(` =================================== `);
    console.log(`| PIECE: ${name}       from: ${from}     |`);
    console.log(`|                       to: ${to}     |`);
    console.log(` =================================== \n`);

    const piece = new ChessPiece({ position: from });

    console.log('\t', pieceMoves(piece, to), '\n');
}
