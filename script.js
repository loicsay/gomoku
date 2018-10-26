const N_MAX = 19; // Size of the board
const N_WIN = 5; // Number of consecutive pawn to win
let board = [[]];
let turn = {
  value: 1,
  color: "yellow"
}
let end;
let score;

//
// Functions we need to check variables and to handle the game
//
function changeTurn() { // Changing the turn variable
  if (turn.value === 1) {
    turn.value = 2;
    turn.color = "green";
  }
  else {
    turn.value = 1;
    turn.color = "yellow";
  }
}

function boardIsFull() {
  let i,j;
  for (i=0; i<N_MAX; i++) {
    for (j=0; j<N_MAX; j++) {
      if (board[i][j].content === 0) {
        return false;
      }
    }
  }
  return true;
}

function checkBoard() {
  if (boardIsFull()) {
    return 0;
  }
  return 3;
}

//
// Checking board functions
//

// Horizontal scan to add points to the score depending on the input
function HorizontalScan(pawnValue) {
  let i,j;
  let score = 0;
  let cpt = 0;
  for (i=0; i<N_MAX; i++) {
    for (j=0; j<N_MAX-1; j++) {
      if (board[i][j].content === pawnValue) {
        if (board[i][j+1].content === pawnValue) {
          cpt++;
        }
        else {
          switch (cpt) {
            case N_WIN-1:
              end = pawnValue;
              score += 1000;
              break;
            case 1:
              score += 1;
              break;
            case 2:
              score += 10;
              break;
            case 3:
              score += 100;
              break;
          }
          cpt = 0;
        }
      }
    }
  }
  return score;
}

// Vertical scan to add points to the score depending on the input
function verticalScan(pawnValue) {
  let i,j;
  let score = 0;
  let cpt = 0;
  for (j=0; j<N_MAX; j++) {
    for (i=0; i<N_MAX-1; i++) {
      if (board[i][j].content === pawnValue) {
        if (board[i+1][j].content === pawnValue) {
          cpt++;
        }
        else {
          switch (cpt) {
            case N_WIN-1:
              end = pawnValue;
              score += 1000;
              break;
            case 1:
              score += 1;
              break;
            case 2:
              score += 10;
              break;
            case 3:
              score += 100;
              break;
          }
          cpt = 0;
        }
      }
    }
  }
  return score;
}

//
// Initialisation functions
//
function initBoard() { // Initialisation of the HTML game board
  let i,j;
  let board = document.createElement("board");
  let row_tmp;
  let case_tmp;
  for (i=0; i<N_MAX; i++) {
    row_tmp = document.createElement("div");
    row_tmp.className = "row";
    for (j=0; j<N_MAX; j++) {
      case_tmp = document.createElement("div");
      case_tmp.className = "case";
      case_tmp.textContent = "O";
      case_tmp.X = i; // Put the correct coordinates into X and Y for each case
      case_tmp.Y = j;
      case_tmp.content = 0; // 0 for empty, 1 for player1, 2 for player2
      row_tmp.appendChild(case_tmp);
    }
    board.appendChild(row_tmp);
  }
  let insertion = document.querySelector("body");
  insertion.appendChild(board);
}

//
// Main function : start the game by calling different functions
//
function startGame() { // Adding interaction to the game board
  initBoard();
  let i,j;
  let k = 0;
  board_tmp = document.querySelectorAll(".case");
  for (i=0; i<N_MAX; i++) { // Fill the two dimension array board
    board.push([]);
    for (j=0; j<N_MAX; j++) {
      board[i][j] = board_tmp[k];
      board[i][j].addEventListener("click", function(e) {
        if (e.target.content === 0) {
          e.target.content = turn.value; // change the value of the case
          e.target.style.color = turn.color; // change the style of the case
          console.log(verticalScan(1));
          console.log(end);
          //
          // check if the board is full or if we have a winner
          //
          changeTurn();
        }
      });
      k++;
    }
  }
  board.pop();
}

startGame();
