document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const restartBtn = document.getElementById("restartBtn");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

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

  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("id"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkResult();
  }

  function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      status.innerHTML = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      status.innerHTML = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.innerHTML = `Player ${currentPlayer}'s turn`;
  }

  function handleRestartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    status.innerHTML = `Player ${currentPlayer}'s turn`;

    document.querySelectorAll(".cell").forEach((cell) => {
      cell.innerHTML = "";
    });
  }

  board.addEventListener("click", handleCellClick);
  restartBtn.addEventListener("click", handleRestartGame);
});
