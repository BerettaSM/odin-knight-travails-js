import { Piece } from "./chess";

export type Position = [number, number];

export type PieceConfig = {
    lastPosition?: Piece;
    position?: Position;
};