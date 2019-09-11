import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import _ from "lodash";

import SudokuSquare from "./SudokuSquare";

const shuffleList = () => {
  return _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
};

const arrayToGridList = arr => {
  const gridList = [];
  let gridRow = 1,
    gridCount = 0,
    count = 1,
    k = 0;
  while (gridRow <= 3) {
    gridList.push([], [], []);
    for (let i = gridRow * 3 - 3; i < gridRow * 3; i++) {
      for (let j = count * 3 - 3; j < count * 3; j++)
        gridList[gridCount][k++] = arr[i][j];
      if (k === 9 && count < 3) {
        k = 0;
        gridCount++;
        count++;
        i = gridRow * 3 - 4;
      }
    }
    gridCount++;
    gridRow++;
    count = 1;
    k = 0;
  }

  return gridList;
};

const setupDiagonalGrids = arr => {
  let k = 0;
  while (k <= 6) {
    let count = 0;
    const grid = shuffleList();
    for (let i = k; i < k + 3; i++) {
      for (let j = k; j < k + 3; j++) arr[i][j] = grid[count++];
    }
    k += 3;
  }
};

const generateSudoku = () => {
  const arr = [];
  let i, j;
  for (i = 0; i < 9; i++) {
    arr.push([]);
    for (j = 0; j < 9; j++) arr[i].push(0);
  }

  setupDiagonalGrids(arr);

  const stack = [];
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (arr[i][j] === 0) {
        let isAllowed = false;
        while (!isAllowed) {
          const rowArr = [];
          const colArr = [];
          const gridArr = [];
          for (num = 0; num < 9; num++) rowArr.push(arr[i][num]);
          for (num = 0; num < 9; num++) colArr.push(arr[num][j]);
          const rowNum = Math.floor(i / 3) * 3;
          const colNum = Math.floor(j / 3) * 3;
          for (row = rowNum; row < rowNum + 3; row++) {
            for (col = colNum; col < colNum + 3; col++)
              gridArr.push(arr[row][col]);
          }
          if (arr[i][j] < 9) {
            arr[i][j]++;
            isAllowed =
              !rowArr.includes(arr[i][j]) &&
              !colArr.includes(arr[i][j]) &&
              !gridArr.includes(arr[i][j]);
            if (isAllowed) stack.push({ row: i, col: j });
          } else {
            arr[i][j] = 0;
            const prevCell = stack.pop();
            i = prevCell.row;
            j = prevCell.col;
          }
        }
      }
    }
  }

  return arrayToGridList(arr);
};

const SudokuBoard = () => {
  const [sudoku, setSudoku] = useState([]);
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    setSudoku(generateSudoku());
    setLoader(false);
  }, []);

  renderSquares = () =>
    sudoku.map((numList, index) => (
      <SudokuSquare numberList={numList} key={index} />
    ));

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
    marginVertical: 20,
    marginHorizontal: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SudokuBoard;
