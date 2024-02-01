function generateMaze(columnsNumber, rowsNumber, tractorsNumber) {
    const map = [];

    for (let y = 0; y < rowsNumber; y++) {
        const row = [];
        for (let x = 0; x < columnsNumber; x++) {
            row.push('X');
        }
        map.push(row);
    }

    function isEven(number) {
        return number % 2 === 0;
    }

    function getRandomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    const startX = getRandomFrom(Array(columnsNumber).fill(0).map((item, index) => index).filter(isEven));
    const startY = getRandomFrom(Array(rowsNumber).fill(0).map((item, index) => index).filter(isEven));

    var tractors = [];

    for (let i = 0; i < tractorsNumber; i++) {
        tractors.push({
            x: startX,
            y: startY
        });
    }

    function setField(x, y, value) {
        if (x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
            return;
        }
        map[y][x] = value;
    }

    setField(startX, startY, ' ');

    function isMaze() {
        for (let x = 0; x < columnsNumber; x++) {
            for (let y = 0; y < rowsNumber; y++) {
                if (isEven(x) && isEven(y) && getField(x, y) === 'X') {
                    return false;
                }
            }
        }
        return true;
    }

    while (!isMaze()) {
        moveTractor();
    }

    return map;

    function getField(x, y) {
        if (x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
            return;
        }
        return map[y][x];
    }

    function moveTractor() {
        for (const tractor of tractors) {
            const directions = [];

            if (tractor.x > 0) {
                directions.push('left');
            }

            if (tractor.x < columnsNumber - 2) {
                directions.push('right');
            }

            if (tractor.y > 0) {
                directions.push('up');
            }

            if (tractor.y < rowsNumber - 2) {
                directions.push('down');
            }

            const direction = getRandomFrom(directions);

            switch (direction) {
                case 'left':
                    if (getField(tractor.x - 2, tractor.y) === 'X') {
                        setField(tractor.x - 1, tractor.y, ' ');
                        setField(tractor.x - 2, tractor.y, ' ');
                    }
                    tractor.x -= 2;
                    break;
                case 'right':
                    if (getField(tractor.x + 2, tractor.y) === 'X') {
                        setField(tractor.x + 1, tractor.y, ' ');
                        setField(tractor.x + 2, tractor.y, ' ');
                    }
                    tractor.x += 2;
                    break;
                case 'up':
                    if (getField(tractor.x, tractor.y - 2) === 'X') {
                        setField(tractor.x, tractor.y - 1, ' ');
                        setField(tractor.x, tractor.y - 2, ' ');
                    }
                    tractor.y -= 2;
                    break;
                case 'down':
                    if (getField(tractor.x, tractor.y + 2) === 'X') {
                        setField(tractor.x, tractor.y + 1, ' ');
                        setField(tractor.x, tractor.y + 2, ' ');
                    }
                    tractor.y += 2;
                    break;
            }
        }
    }
}



