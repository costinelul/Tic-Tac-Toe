const X_TURN = "x";
const O_TURN = "o";
const XSCORE = document.querySelector(".x-points");
const OSCORE = document.querySelector(".o-points");
const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const showResult = document.querySelector(".result");
const winnerText = document.querySelector(".winner-text");
const restart = document.querySelector(".restart");
const resetScore = document.querySelector(".reset-score");
let turnspassed = 0;
let circleTurn = false;
let xScoreCounter = 0;
let oScoreCounter = 0;

startGame();

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
restart.addEventListener("click", restartGame);
resetScore.addEventListener("click", function () {
    restartGame();
    xScoreCounter = 0;
    oScoreCounter = 0;
    XSCORE.innerHTML = xScoreCounter;
    OSCORE.innerHTML = oScoreCounter;
});



function startGame() {
    board.classList.add(X_TURN);
    cells.forEach(addEventListener);
}

function addEventListener(cell) {
    cell.addEventListener("click", handleClick, { once: true });
}
function handleClick(cell) {
    placeMark(cell.target);
    checkDraw();
    checkWin();
    swapTurns();
}
function restartGame() {
    showResult.style.display = "none";
    cells.forEach((cell) => {
        cell.classList.remove(X_TURN);
        cell.classList.remove(O_TURN);
        cell.removeEventListener("click", handleClick);
    });
    if (circleTurn) {
        board.classList.remove(O_TURN);
    }
    circleTurn = false;
    turnspassed = 0;
    startGame();
}

function checkWin() {
    winningCombinations.forEach(function (combination) {
        let in_a_row = 0;
        combination.forEach(function (winningIndex) {
            const currentTurn = circleTurn ? O_TURN : X_TURN;
            if (cells[winningIndex].classList.contains(currentTurn)) {
                in_a_row++;
            }
            if (in_a_row == 3) {
                circleTurn ? oScoreCounter++ : xScoreCounter++;
                showWinner(currentTurn);
            }
        });
    });
}

function checkDraw() {
    if (turnspassed == 8) {
        showDraw();
    }
}

function showDraw() {
    winnerText.innerHTML = "Draw!";
    showResult.style.display = "flex";
}

function showWinner(currentTurn) {
    XSCORE.innerHTML = xScoreCounter;
    OSCORE.innerHTML = oScoreCounter;
    winnerText.innerHTML = `${currentTurn.toUpperCase()} Wins!`;
    showResult.style.display = "flex";
}

function placeMark(cell) {
    const currentTurn = circleTurn ? O_TURN : X_TURN;
    cell.classList.add(currentTurn);
}

function swapTurns() {
    turnspassed++;
    board.classList.remove(X_TURN);
    board.classList.remove(O_TURN);
    circleTurn = !circleTurn;
    const currentTurn = circleTurn ? O_TURN : X_TURN;
    board.classList.add(currentTurn);
}
