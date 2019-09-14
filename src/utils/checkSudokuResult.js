export default checkSudokuResult = sudoku => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (
        !sudoku[i][j].visible &&
        sudoku[i][j].value !== sudoku[i][j].inputValue
      )
        return false;
    }
  }
  return true;
};
