import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import SudokuSquare from "./SudokuSquare";
import { generateSudoku, hideSudokuCells } from "../utils";

const SudokuBoard = ({ visibleElements }) => {
  const [sudoku, setSudoku] = useState([]);
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    const sudoku = generateSudoku();
    hideSudokuCells(sudoku, visibleElements);
    setSudoku(sudoku);
    setLoader(false);
  }, []);

  renderSquares = () => {
    return sudoku.map((numList, index) => (
      <SudokuSquare numberList={numList} key={index} grid={index} />
    ));
  };

  return (
    <View style={style.sudokuContainerStyle}>
      {loading ? (
        <Button
          mode="text"
          color="2d2d2d"
          loading
          uppercase={false}
          disabled
        ></Button>
      ) : (
        renderSquares()
      )}
    </View>
  );
};

const style = StyleSheet.create({
  sudokuContainerStyle: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SudokuBoard;
