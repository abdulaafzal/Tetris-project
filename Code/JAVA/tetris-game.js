import Arena from './tetris-arena.js';
import Player from './tetris-player.js';
import { collide, merge } from './tetris-util.js';
import { rotate } from './tetris-pieces.js';

export default class Tetris {
constructor(canvas, scoreElement) {
this.context = canvas.getContext('2d');
this.context.scale(20, 20);

this.colors = [
null, '#FF4C4C', '#FFD700', '#32CD32',
'#1E90FF', '#9370DB', '#FFA500', '#00CED1'
];

this.arena = new Arena(12, 20);
this.player = new Player(this.arena, this.gameOver.bind(this));
this.scoreElement = scoreElement;

this.dropCounter = 0;
this.dropInterval = 1000;
this.lastTime = 0;

this.update = this.update.bind(this);

this._initControls();
this.player.reset();
this.updateScore();

requestAnimationFrame(this.update);
}

_initControls() {
document.addEventListener('keydown', e => {
if (e.key === 'ArrowLeft') this.move(-1);
else if (e.key === 'ArrowRight') this.move(1);
else if (e.key === 'ArrowDown') this.drop();
else if (e.key === 'ArrowUp') this.rotate(1);
});
}

drawMatrix(matrix, offset) {
matrix.forEach((row, y) => {
row.forEach((value, x) => {
if (value !== 0) {
this.context.fillStyle = this.colors[value];
this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
}
});
});
}

draw() {
this.context.fillStyle = '#000';
this.context.fillRect(0, 0, 12, 20);
this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
this.drawMatrix(this.player.matrix, this.player.pos);
}

drop() {
this.player.pos.y++;
if (collide(this.arena.matrix, this.player)) {
this.player.pos.y--;
merge(this.arena.matrix, this.player);
this.player.reset();
this.arena.sweep(this.player, this.updateScore.bind(this));
}
this.dropCounter = 0;
}

move(dir) {
this.player.pos.x += dir;
if (collide(this.arena.matrix, this.player)) {
this.player.pos.x -= dir;
}
}

rotate(dir) {
rotate(this.player.matrix, dir);
if (collide(this.arena.matrix, this.player)) {
rotate(this.player.matrix, -dir);
}
}

update(time = 0) {
const deltaTime = time - this.lastTime;
this.lastTime = time;
this.dropCounter += deltaTime;

if (this.dropCounter > this.dropInterval) {
this.drop();
}

this.draw();
requestAnimationFrame(this.update);
}

updateScore() {
this.scoreElement.innerText = this.player.score;
}

gameOver() {
// Get the last logged-in username
const currentUser = sessionStorage.getItem('currentUser');
if (currentUser) {
const data = JSON.parse(localStorage.getItem(currentUser)) || {};
// Update username and score (keep the higher one)
data.username = currentUser;
data.score = Math.max(data.score || 0, this.player.score);
localStorage.setItem(currentUser, JSON.stringify(data));
}
localStorage.setItem('lastScore', this.player.score);
// Redirect to the game over page
window.location.href = 'tetris-over.html';
}
}