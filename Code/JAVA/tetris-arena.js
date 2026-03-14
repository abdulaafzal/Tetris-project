import { createMatrix } from './tetris-util.js';

export default class Arena {
constructor(w, h) {
this.matrix = createMatrix(w, h);
}

sweep(player, updateScore) {
outer: for (let y = this.matrix.length - 1; y > 0; --y) {
for (let x = 0; x < this.matrix[y].length; ++x) {
if (this.matrix[y][x] === 0) continue outer;
}
const row = this.matrix.splice(y, 1)[0].fill(0);
this.matrix.unshift(row);
++y;
player.score += 10;
updateScore();
}
}
}