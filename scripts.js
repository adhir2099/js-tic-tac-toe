const squares = document.querySelectorAll('.square');
let currentPlayer = 'X';
let moves = 0;

function handleClick(e) {
    const square = e.target;
    square.textContent = currentPlayer;
    square.classList.add(currentPlayer);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    moves++;
}

function checkForWinner() {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a].textContent && squares[a].textContent === squares[b].textContent && squares[b].textContent === squares[c].textContent) {
            showWinningAlert(squares[a].textContent + ' wins!');
            squares.forEach(square => square.removeEventListener('click', handleClick));
            return;
        }
        
        if (moves === squares.length) {
            showWinningAlert("It's a Tie!");
            squares.forEach(square => square.removeEventListener('click', handleClick));
            return;
        }
    }
}

function handleGameEnd(winner) {
    showWinningAlert(winner);
    squares.forEach(square => square.removeEventListener('click', handleClick));
}

squares.forEach(square => square.addEventListener('click', handleClick));

squares.forEach(square => square.addEventListener('click', () => {
    const winner = checkForWinner();
    if (winner) {
        handleGameEnd(winner);
    }
}));

// Reset button element
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', resetGame);

function resetGame() {
    hideWinningAlert();
    location.reload();
}

function showWinningAlert(winner) {
    var winningMessage = winner;
    var alertElement = document.createElement('div');
    alertElement.innerHTML = winningMessage;
    alertElement.classList.add('winning-alert');
    document.body.appendChild(alertElement);
}

function hideWinningAlert() {
    var alertElement = document.querySelector('.winning-alert');
    if (alertElement) {
        alertElement.parentNode.removeChild(alertElement);
    }
}