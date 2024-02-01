const columnsSize = 35;
const rowsSize = 35;
const fieldSize = 7;
const padding = 10;

var player = {};
player.X = 0;
player.Y = 0;

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
    context.fillStyle = 'white';
    context.beginPath();
    context.rect(padding, 0, fieldSize, padding);
    context.fill();
    
    context.fillStyle = 'white';
    context.beginPath();
    
    if (columnsSize % 2 === 0) {
        shiftX = fieldSize;
    }
    if (rowsSize % 2 === 0) {
        shiftY = fieldSize;
    }
    
    context.rect((columnsSize - 1) * fieldSize + padding - shiftX, rowsSize * fieldSize + padding - shiftY, fieldSize, padding + shiftY);
    context.fill();
}

function drawPlayer() {
    context.fillStyle = 'red';
    context.beginPath();
    context.rect(padding + player.X * fieldSize, padding + player.Y * fieldSize, fieldSize, fieldSize);
    context.fill();
}

document.addEventListener('keydown', function (e) {
    if (e.which === 38) {
        if ( ((player.Y - 1) >= 0) && (getField(player.X, player.Y - 1 ) != 'X') ) {
            player.Y--;
        }
    }
    if (e.which === 40) {
        if ( ((player.Y + 1) < rowsSize) && (getField(player.X, player.Y + 1 ) != 'X') ) {
            player.Y++;
        }
    }
    if (e.which === 37) {
        if ( ((player.X - 1) >= 0) && (getField(player.X - 1, player.Y ) != 'X') ) {
            player.X--;
        }
    }
    if (e.which === 39) {
        if ( ((player.X + 1) < columnsSize) && (getField(player.X + 1, player.Y ) != 'X') ) {
            player.X++;
        }
    }
});

function loop() {
    lp = requestAnimationFrame(loop);

    init();
    drawMap();
    drawExit();
    drawPlayer();
    if ((player.X == columnsSize - 1) && (player.Y == rowsSize - 1)) {
        cancelAnimationFrame(lp);

        var js1 = document.createElement("link");
        js1.href = "https://mihailmaximov.ru/projects/maze/style.css";
        js1.rel = "stylesheet";
        document.head.appendChild(js1);
    }
}

lp = requestAnimationFrame(loop);
