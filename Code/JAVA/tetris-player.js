import { createPiece } from './tetris-pieces.js';
import { collide } from './tetris-util.js';

export default class Player {
constructor(arena, onGameOver) {
this.arena = arena;
this.pos = { x: 0, y: 0 };
this.matrix = null;
this.score = 0;
this.onGameOver = onGameOver;
}

reset() {
const pieces = 'ILJOTSZ';
this.matrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);
this.pos.y = 0;
this.pos.x = (this.arena.matrix[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);

if (collide(this.arena.matrix, this)) {
this.onGameOver();
}
}
}