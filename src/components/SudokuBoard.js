import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import SudokuSquare from "./SudokuSquare";

const generateSudoku = () => {
  return [
    [9, 8, 7, 6, 5, 4, 3, 2, 1],
    [1, 3, 5, 7, 9, 2, 4, 6, 8],
    [2, 4, 6, 8, 1, 3, 5, 7, 9],
    [1, 9, 2, 8, 3, 7, 4, 6, 5],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 4, 7, 2, 3, 5, 8, 9, 6],
    [2, 3, 6, 7, 9, 8, 1, 4, 5],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [7, 5, 6, 4, 3, 1, 2, 8, 9]
  ];
};

const SudokuBoard = () => {
  const [sudoku] = useState(generateSudoku());

  renderSquares = () =>
    sudoku.map((numList, index) => (
      <SudokuSquare numberList={numList} key={index} />
    ));

  return <View style={style.sudokuContainerStyle}>{renderSquares()}</View>;
};

const style = StyleSheet.create({
  sudokuContainerStyle: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default SudokuBoard;
