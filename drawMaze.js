const columnsSize = 450;
const rowsSize = 450;
const fieldSize = 7;
const padding = 10;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const tractorsNumber = 50;
const maze = generateMaze(columnsSize, rowsSize, tractorsNumber);

var shiftX = 0;
var shiftY = 0;

function init() {
    canvas.width = padding * 2 + columnsSize * fieldSize;
    canvas.height = padding * 2 + rowsSize * fieldSize;

    context.fillStyle = 'black';
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();

    context.fillStyle = 'white';
    context.beginPath();
    context.rect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);
    context.fill();
}

function getField(x, y) {
    if (x < 0 || x >= columnsSize || y < 0 || y >= rowsSize) {
        return null;
    }
    return maze[y][x];
}

function drawMap() {
    for (let x = 0; x < columnsSize; x++) {
        for (let y = 0; y < rowsSize; y++) {
            if (getField(x, y) === 'X') {
                context.fillStyle = 'black';
                context.beginPath();
                context.rect(padding + x * fieldSize, padding + y * fieldSize, fieldSize, fieldSize);
                context.fill();
            }
        }
    }
}

function drawExit() {
    if (columnsSize % 2 === 0) {shiftX = fieldSize;}
    if (rowsSize % 2 === 0) {shiftY = fieldSize;}

    context.fillStyle = 'white';
    context.beginPath();
    context.rect(padding, 0, fieldSize, padding);
    context.fill();

    context.fillStyle = 'white';
    context.beginPath();
    context.rect((columnsSize - 1) * fieldSize + padding - shiftX, rowsSize * fieldSize + padding - shiftY, fieldSize, padding);
    context.fill();
}

init();
drawMap();
drawExit();
