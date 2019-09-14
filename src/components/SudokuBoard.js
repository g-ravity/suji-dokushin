import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import SudokuSquare from "./SudokuSquare";
import { Context as GameContext } from "../context/GameContext";
import { generateSudoku, hideSudokuCells, arrayToGridList } from "../utils";

const SudokuBoard = ({ visibleElements }) => {
  const { state, storeSudoku } = useContext(GameContext);
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    let sudoku = generateSudoku();
    sudoku = hideSudokuCells(sudoku, visibleElements);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!sudoku[i][j].visible) sudoku[i][j].inputValue = "";
      }
    }
    storeSudoku(sudoku);
    setLoader(false);
  }, []);

  renderSquares = () => {
    const sudokuGrid = arrayToGridList(state.sudoku);
    return sudokuGrid.map((numList, index) => (
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
