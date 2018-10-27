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

//                             //
//  Checking board functions   //
//                             //
function calculateScore(pawn_chain, pawn_value) { // return the score depending on the pawn chain
  switch (true) {
    case (pawn_chain >= N_WIN-1):
      end = pawn_value;
      return 1000;
      break;
    case (pawn_chain === 1):
      return 1;
      break;
    case (pawn_chain === 2):
      return 10;
      break;
    case (pawn_chain === 3):
      return 100;
      break;
    default:
      return 0;
  }
}

// Horizontal scan and calculate score depending on the input
function horizontalScan(pawn_value) {
  let i,j;
  let score = 0;
  let pawn_chain = 0;
  for (i=0; i<N_MAX; i++) { // Scans the rows
    for (j=0; j<N_MAX-1; j++) { // Scans the columns
      if (board[i][j].content === pawn_value && board[i][j+1].content === pawn_value) {
          pawn_chain++;
          if (i === N_MAX-1 && j === N_MAX-2) { // For the last case
            score += calculateScore(pawn_chain, pawn_value);
          }
      }
      else {
        score += calculateScore(pawn_chain, pawn_value);
        pawn_chain = 0;
      }
    }
  }
  return score;
}

// Vertical scan and calculate score depending on the input
function verticalScan(pawn_value) {
  let i,j;
  let score = 0;
  let pawn_chain = 0;
  for (j=0; j<N_MAX; j++) {
    for (i=0; i<N_MAX-1; i++) {
      if (board[i][j].content === pawn_value && board[i+1][j].content === pawn_value) {
          pawn_chain++;
          if (i === N_MAX-2 && j === N_MAX-1) { // For the last case
            score += calculateScore(pawn_chain, pawn_value);
          }
        }
        else {
          score += calculateScore(pawn_chain, pawn_value);
          pawn_chain = 0;
        }
      }
    }
  return score;
}

// Diagonal scan and calculate score depending on the input
function diagonalScan(pawn_value) {
  let i,j,w;
  let score = 0;
  let pawn_chain1 = 0;
  let pawn_chain2 = 0;
  for (w=0; w<N_MAX; w++) {
		for (j=0, i=w; i<N_MAX-1; i++, j++) {
			if (board[i][j].content === pawn_value && board[i+1][j+1].content === pawn_value) {
				pawn_chain1++;
        if (i === N_MAX-2 && j === 0) { // For the last case
          score += calculateScore(pawn_chain1, pawn_value);
        }
      }
			else {
        score += calculateScore(pawn_chain1, pawn_value);
        pawn_chain1 = 0;
		  }
	 }
  }
	for (w=1; w<N_MAX; w++) {
		for(i=0, j=w; j<N_MAX-1; i++, j++) {
			if (board[i][j].content === pawn_value && board[i+1][j+1].content === pawn_value) {
				pawn_chain2++;
        if (i === 0 && j === N_MAX-2) { // For the last case
          score += calculateScore(pawn_chain2, pawn_value);
        }
      }
			else {
        score += calculateScore(pawn_chain2, pawn_value);
        pawn_chain2 = 0;
      }
    }
  }
  return score;
}

// Reversed diagonal scan and calculate score depending on the input
function reverseDiagonalScan(pawn_value) {
  let i = N_MAX-1;
	let pawn_chain1 = 0;
	let pawn_chain2 = 0;
	let cpt;
	let score = 0;
	let j;
  for (cpt=0; cpt<N_MAX-1; cpt++) {
    // Scanning the down half
		for (j=cpt; j<N_MAX-1; j++) {
    	if (board[i][j].content === pawn_value && board[i-1][j+1].content === pawn_value) {
          pawn_chain1++;
          if (i === N_MAX-1 && j === N_MAX-2) { // For the last case
            score += calculateScore(pawn_chain1, pawn_value);
          }
      }
			else {
        score += calculateScore(pawn_chain1, pawn_value);
				pawn_chain1 = 0;
			}
      --i;
  	}
    j = 0;
    // Scanning the high half
    for (i=N_MAX-2-cpt; i>0; i--) {
      console.log(board[i][j]);
      if (board[i][j].content === pawn_value && board[i-1][j+1].content === pawn_value) {
          pawn_chain2++;
          if (i === 1 && j === 0) { // For the last case
            score += calculateScore(pawn_chain2, pawn_value);
          }
      }
      else {
        score += calculateScore(pawn_chain2, pawn_value);
        pawn_chain2 = 0;
      }
      j++;
    }
    i = N_MAX-1; // re-init "i" for the next loop
  }
  return score;
}

//
// Initialisation functions
//
function initBoard() { // Initialisation of the HTML game board
  let i,j,k;
  let board = document.createElement("div");
  board.className = "board";
  let row_tmp;
  let case_tmp;
  let subcase_tmp;
  for (i=0; i<N_MAX; i++) {
    row_tmp = document.createElement("div");
    row_tmp.className = "row";
    for (j=0; j<N_MAX; j++) {
      case_tmp = document.createElement("div");
      case_tmp.className = "case";
      case_tmp.content = 0; // 0 for empty, 1 for player1, 2 for player2
      for(k=0; k<4; k++) { // Create 4 subcases in order to create one case
        subcase_tmp = document.createElement("div")
        subcase_tmp.className = "subcase";
        case_tmp.appendChild(subcase_tmp);
      }
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
          console.log(reverseDiagonalScan(1));
          //
          // check if the board is full or if we have a winner
          //
        }
      });
      k++;
    }
  }
  board.pop();
}

startGame();
