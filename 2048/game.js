

const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');  
const gameOverMessage = document.getElementById('game-over-message');
let board = [];
let score = 0;

const size = 4; 


function createBoard() {
    board = [];
    score = 0;
    for (let row = 0; row < size; row++) {
        board[row] = [];
        for (let col = 0; col < size; col++) {
            board[row][col] = 0;
        }
    }
    generateRandomNumber();
    generateRandomNumber();
    renderBoard();
    gameOverMessage.classList.remove('show');  
    restartButton.style.display = 'none';  
}


function generateRandomNumber() {
    let emptyCells = [];
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    
    if (emptyCells.length === 0) return; 
    
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const randomValue = Math.random() < 0.9 ? 2 : 4;
    board[randomCell.row][randomCell.col] = randomValue;
}


function getCellClass(value) {
    switch(value) {
        case 2: return 'grid-item-2';
        case 4: return 'grid-item-4';
        case 8: return 'grid-item-8';
        case 16: return 'grid-item-16';
        case 32: return 'grid-item-32';
        case 64: return 'grid-item-64';
        case 128: return 'grid-item-128';
        case 256: return 'grid-item-256';
        case 512: return 'grid-item-512';
        case 1024: return 'grid-item-1024';
        case 2048: return 'grid-item-2048';
        default: return '';
    }
}


function renderBoard() {
    gridContainer.innerHTML = '';
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            const value = board[row][col];
            cell.classList.add('grid-item');
           
            if (value !== 0) {
                cell.classList.add(getCellClass(value));
                cell.textContent = value;
            } else {
                cell.classList.add('empty');
            }
            gridContainer.appendChild(cell);
        }
    }
    scoreDisplay.textContent = 'Puan : ' + score;
}


function slideAndMerge(line) {
    let newLine = line.filter(val => val !== 0); 
    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i + 1]) {
            newLine[i] *= 2;
            score += newLine[i];
            newLine.splice(i + 1, 1);
        }
    }
    newLine = [...newLine, ...new Array(size - newLine.length).fill(0)]; 
    return newLine;
}


function move(direction) {
    let moved = false;
    if (direction === 'up' || direction === 'down') {
        for (let col = 0; col < size; col++) {
            let column = [];
            for (let row = 0; row < size; row++) {
                column.push(board[row][col]);
            }
            if (direction === 'up') {
                column = slideAndMerge(column);
            } else {
                column.reverse();
                column = slideAndMerge(column);
                column.reverse();
            }
            for (let row = 0; row < size; row++) {
                if (column[row] !== board[row][col]) moved = true;
                board[row][col] = column[row];
            }
        }
    } else {
        for (let row = 0; row < size; row++) {
            let rowValues = board[row];
            if (direction === 'left') {
                rowValues = slideAndMerge(rowValues);
            } else {
                rowValues.reverse();
                rowValues = slideAndMerge(rowValues);
                rowValues.reverse();
            }
            for (let col = 0; col < size; col++) {
                if (rowValues[col] !== board[row][col]) moved = true;
                board[row][col] = rowValues[col];
            }
        }
    }
    if (moved) {
        generateRandomNumber();
        renderBoard();
        checkGameOver();
    }
}


function checkGameOver() {
    let gameOver = true;


    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === 0) gameOver = false; 
            if (row < size - 1 && board[row][col] === board[row + 1][col]) gameOver = false; 
            if (col < size - 1 && board[row][col] === board[row][col + 1]) gameOver = false; 
        }
    }

    
    if (gameOver) {
        gameOverMessage.classList.add('show');
        restartButton.style.display = 'block';  
    }
}



document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') move('up');
  if (e.key === 'ArrowDown') move('down');
  if (e.key === 'ArrowLeft') move('left');
  if (e.key === 'ArrowRight') move('right');
});


restartButton.addEventListener('click', () => {
  createBoard();  
});


createBoard();


const themes = ['dark', 'yaga', 'light'];
let currentThemeIndex = 0;

function cycleTheme() {
document.body.classList.remove(themes[currentThemeIndex]);
currentThemeIndex = (currentThemeIndex + 1) % themes.length;
document.body.classList.add(themes[currentThemeIndex]);
}





const sound = new Audio('./audio/sahur.mp3'); 
sound.volume = 0.36,5;


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        sound.play();  
        move('up');
    }
    if (e.key === 'ArrowDown') {
        sound.play();
        move('down');
    }
    if (e.key === 'ArrowLeft') {
        sound.play();
        move('left');
    }
    if (e.key === 'ArrowRight') {
        sound.play();
        move('right');
    }




});




const image = document.querySelector('.sr7');
const audio = document.querySelector('.sahurr');

image.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

let startTime = Date.now(); 

function startTimer() {
    setInterval(function() {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000); 
        updateTimerDisplay(elapsedTime); 
    }, 1000); 
}

function updateTimerDisplay(elapsedTime) {
    
    let minutes = Math.floor(elapsedTime / 60); 
    let seconds = elapsedTime % 60; 
    document.getElementById("timerDisplay").innerText = `Geçen Süre: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

startTimer(); 





document.getElementById("highScoreDisplay").innerText = `Max Skor: ${score}`;










