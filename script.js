function init_board() { // Initialisation of the game board
  let i,j;
  let board = document.createElement("board");
  let row_tmp;
  let case_tmp;
  for (i=1; i<=15; i++) {
    row_tmp = document.createElement("div");
    row_tmp.className = "row";
    for (j=1; j<=15; j++) {
      case_tmp = document.createElement("div");
      case_tmp.className = "case";
      case_tmp.textContent = "O";
      case_tmp.X = i; // put the correct coordinates into X and Y for each case
      case_tmp.Y = j;
      row_tmp.appendChild(case_tmp);
    }
    board.appendChild(row_tmp);
  }
  let insertion = document.querySelector("body");
  insertion.appendChild(board);
}

init_board();
