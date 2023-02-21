const squares = document.querySelectorAll('.square');
let currentPlayer = 'X';

function handleClick(e) {
    const square = e.target;
    square.textContent = currentPlayer;
    square.classList.add(currentPlayer);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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
        return squares[a].textContent;
        }
    }

    return null;
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
    //You can use a For loop to clean the board
    // for (let i = 0; i < squares.length; i++) {
    //   squares[i].textContent = '';
    // }

    hideWinningAlert();

    location.reload();
}

function showWinningAlert(winner) {
    var winningMessage = winner + ' wins!';
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