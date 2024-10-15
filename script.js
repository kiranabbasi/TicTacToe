const cells = document.querySelectorAll('.cell');
const messageDisplay = document.querySelector('.message');
const resetButton = document.querySelector('.reset');

let currentPlayer = 'X'; // The player always plays as X
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();

    if (isGameActive) {
        setTimeout(computerMove, 500); // Delay computer move
    }
}

function computerMove() {
    const emptyCells = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);

    // Randomly choose an available cell
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMoveIndex = emptyCells[randomIndex];
        board[computerMoveIndex] = 'O';
        cells[computerMoveIndex].textContent = 'O';

        checkResult();
    }
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') continue;

        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageDisplay.textContent = `You won!`;
        showFireworks(); // Show fireworks on user win
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        messageDisplay.textContent = `It's a draw!`;
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
}

function showFireworks() {
    const fireworks = new Fireworks(document.body, {
        maxRockets: 5, // Maximum number of rockets
        rocketSpawnInterval: 150, // Interval between rocket launches
        numParticles: 100, // Number of particles in each firework
        explosionChance: 0.5 // Chance of explosion per particle
    });
    fireworks.start(); // Start the fireworks
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    messageDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
