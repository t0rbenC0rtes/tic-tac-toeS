// S E L E C T   K E Y   E L E M E N T S

const board = document.querySelector(".board");
const msg = document.querySelector(".message");
const restart = document.querySelector(".restart");


// C R E A T E   S T A R T I N G   A R R A Y

const startCells = ["", "", "", "", "", "", "", "", ""];

// G L O B A L   V A R I A B L E S

let currentPlayer = "cross";
msg.textContent = `Starting player : ${currentPlayer}`;

// C R E A T E   9   C E L L   D I V s

function paintBoard() {
  startCells.forEach((_cell, index) => {                        // Loop 9 times
    const cellElement = document.createElement("div");          // Create 9 divs
    cellElement.classList.add("cell");                          // add .cell class
    cellElement.classList.add("toes");                          // add .cell class
    cellElement.id = index;                                     // add id's 0 to 9
    // L I S T E N   T O   E A C H   D I V
    cellElement.addEventListener("click", addPlay);             // After a clic, run addPlay
    board.appendChild(cellElement);                             // append all created elements to the board
  });
}
paintBoard();

// P L A Y   &   S W I T C H

function addPlay(e) {                                   // passing e as arg to use e.target for targeting the clicked cell
  const display = document.createElement("div");        // create more divs
  display.classList.add(currentPlayer);                 // Add a class corresponding to currentPlayer
  e.target.append(display);                             // Append the div to the target (cell)
  // S W I T C H I N G   P L A Y E R
  currentPlayer = currentPlayer == "cross" ? "circle" : "cross";
  msg.textContent = `it is now ${currentPlayer}'s turn.`;
  // S T O P   L I S T E N I N G   T O   P L A Y E D   C E L L S
  e.target.removeEventListener("click", addPlay);       // Remove listener from played cells
  e.target.classList.remove("toes");

  checkWin();
  checkDraw();
}

function checkWin() {
  const allCells = document.querySelectorAll(".cell"); // Select all cells
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winCombinations.forEach((array) => {
                                                                   // Loop over the 8 win conditions
    const circleWins = array.every(
      (
        cell                                                       // For each one, ask if all 3 items
      ) => allCells[cell].firstChild?.classList.contains("circle") // If all 3 items contain a div with the same class, return true.
    );
    if (circleWins) {
                                                                   // If True
      msg.textContent = "Circle wins !";
      array.forEach((cell) => {
        allCells[cell].classList.add('winAnimation');
      });
      // R E M O V E   A L L   L I S T E N E R S
      disableBoard();
    }
  });
  winCombinations.forEach((array) => {
    // Repeat with crosses
    const crossWins = array.every((cell) =>
      allCells[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      msg.textContent = "Cross wins !";
      array.forEach((cell) => {
        allCells[cell].classList.add('winAnimation');
      });
      disableBoard();
    }
  });
}

// C H E C K   F O R   D R A W

function checkDraw() {
  const allCells = document.querySelectorAll(".cell");
  const isBoardFull = [...allCells].every((cell) => cell.firstChild !== null);

  if (isBoardFull && !document.querySelector('.message').textContent.includes("wins")) {
    msg.textContent = "It's a draw !";
    disableBoard();
  }
}

// D I S A B L E   E N T I R E   B O A R D

function disableBoard() {
  const allCells = document.querySelectorAll(".cell");
  allCells.forEach((cell) => {
    cell.removeEventListener("click", addPlay); // Removes click listener from each cell
  });
}

// R E S T A R T   B U T T O N

restart.addEventListener("click", () => {
  board.innerHTML = "";
  msg.textContent = `Starting player : ${currentPlayer}`;
  paintBoard();
});
