let canvas;
let ctx;
let gbArrayHeight = 20;
let gbArrayWidth = 12;
let startX = 4;
let startY = 0;
let coordinateArray = [...Array(gbArrayHeight)].map(e => Array(gbArrayWidth).fill(0));
let currentTetromino = [[1, 0], [0, 1], [1, 1], [2, 1]]

let tetrominos = [];
let tetrominoColors = ['purple', 'cyan', 'blue', 'yellow', 'orange', 'green', 'red'];
let currentTetrominoColor;

let gameBoardArray = [...Array(gbArrayHeight)].map(e => Array(gbArrayWidth).fill(0));

let DIRECTION = {
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};
let direction;

class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

document.addEventListener('DOMContentLoaded', SetupCanvas);

function CreateCoordinateArray() {
    let i = 0, j = 0;
    for (let y = 9; y <= 446; y++) {
        for (let x = 11; x <= 264; x++) {
            coordinateArray[i][j] = new Coordinates(x, y);
            i++;
        }
        j++;
        i = 0;
    }
}

function SetupCanvas() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContex('2d');
    canvas.width = 936;
    canvas.height = 956;

    ctx.scale(2, 2);

    ctx.fillStyle = 'black';
    ctx.fillRectangle(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'white';
    ctx.strokeRect(8, 8, 280, 462);

    document.addEventListener('keydown', HandleKeyPress);
    CreateTetrominos();
    CreateTetromino();

    CreateCoordinateArray();
    DrawTetromino();
}

function DrawTetromino() {
    for (let i = 0; i < currentTetromino.length; i++) {
        let x = currentTetromino[i][0] + startX;
        let y = currentTetromino[i][1] + startY;
        gameBoardArray[x][y] = 1;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = currentTetrominoColor;
        ctx.fillRectangle(coorX, coorY, 21, 21);
    }
}

function HandleKeyPress() {
    if (key.keyCode === 65) {
        direction = DIRECTION.LEFT;
        DeleteTetromino();
        startX--;
        DrawTetromino();
    } else if (key.keyCode === 68) {
        direction = DIRECTION.RIGHT;
        DeleteTetromino();
        startX++;
        DrawTetromino();
    } else if (key.keyCode == 83) {
        direction = DIRECTION.DOWN;
        DeleteTetromino();
        startY++;
        DrawTetromino();
    }
}

function DeleteTetromino() {
    for (let i = 0; i < currentTetromino.length; i++) {
        let x = currentTetromino[i][0] + startX;
        let y = currentTetromino[i][1] + startY;
        gameBoardArray[x][y] = 0;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = 'black';
        ctx.fillRectangle(coorX, coorY, 21, 21);
    }
}

function CreateTetrominos() {
    // T
    tetrominos.push([0, 1], [1, 0], [1, 1], [2, 1]);
    // I
    tetrominos.push([0, 0], [1, 0], [2, 0], [3, 0]);
    // J
    tetrominos.push([0, 0], [1, 0], [2, 0], [2, 1]);
    // Square
    tetrominos.push([0, 0], [0, 1], [1, 0], [1, 1]);
    // L
    tetrominos.push([0, 1], [1, 1], [2, 0], [2, 1]);
    // S
    tetrominos.push([1, 0], [2, 0], [0, 1], [1, 1]);
    // Z
    tetrominos.push([0, 0], [1, 0], [1, 1], [2, 1]);
}

function CreateTetromino(){
    let randomTetromino = Math.floor(Math.random() * tetrominos.length);
    currentTetromino = tetrominos[randomTetromino];
    currentTetrominoColor = tetrominoColors[randomTetromino];
}