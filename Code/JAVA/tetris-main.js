import Tetris from './tetris-game.js';

const canvas = document.getElementById('tetris');
const scoreElement = document.getElementById('score');

// Start the game
new Tetris(canvas, scoreElement);