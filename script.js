const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a];
        }
    }

    if (!board.includes("")) {
        return "draw";
    }

    return null;
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const result = checkWinner();

    if (result === "X" || result === "O") {
        statusText.textContent = `Player ${result} wins!`;
        gameActive = false;
        return;
    }

    if (result === "draw") {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    statusText.textContent = "Player X's turn";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
