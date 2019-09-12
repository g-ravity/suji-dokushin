import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
      for (let j = k; j < k + 3; j++) arr[i][j].value = grid[count++];
    }
    k += 3;
  }
};

hideElements = (arr, visible) => {
  for (let i = 0; i < 9; i++) {
    let num;
    if (i === 8) num = visible;
    else {
      let maxAllowed = false,
        numAllowed = false,
        max = 6;
      while (!maxAllowed) {
        if (Math.floor((visible - max) / (8 - i)) >= 1) maxAllowed = true;
        else max--;
      }
      num = Math.floor(Math.random() * max) + 1;
      while (!numAllowed) {
        if (Math.ceil((visible - num) / (8 - i)) <= 6) {
          numAllowed = true;
          visible -= num;
        } else num++;
      }
    }

    const index = shuffleList();
    for (let j = 0; j < num; j++) {
      arr[i][index[j] - 1].visible = true;
    }
  }

  return arr;
};

const generateSudoku = () => {
  const arr = [];
  let i, j;
  for (i = 0; i < 9; i++) {
    arr.push([]);
    for (j = 0; j < 9; j++) arr[i].push({ value: 0, visible: false });
  }

  setupDiagonalGrids(arr);

  const stack = [];
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (arr[i][j].value === 0) {
        let isAllowed = false;
        while (!isAllowed) {
          const rowArr = [];
          const colArr = [];
          const gridArr = [];
          for (num = 0; num < 9; num++) rowArr.push(arr[i][num].value);
          for (num = 0; num < 9; num++) colArr.push(arr[num][j].value);
          const rowNum = Math.floor(i / 3) * 3;
          const colNum = Math.floor(j / 3) * 3;
          for (row = rowNum; row < rowNum + 3; row++) {
            for (col = colNum; col < colNum + 3; col++)
              gridArr.push(arr[row][col].value);
          }
          if (arr[i][j].value < 9) {
            arr[i][j].value++;
            isAllowed =
              !rowArr.includes(arr[i][j].value) &&
              !colArr.includes(arr[i][j].value) &&
              !gridArr.includes(arr[i][j].value);
            if (isAllowed) stack.push({ row: i, col: j });
          } else {
            arr[i][j].value = 0;
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

const SudokuBoard = ({ visibleElements }) => {
  const [sudoku, setSudoku] = useState([]);
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    const sudoku = generateSudoku();
    setSudoku(hideElements(sudoku, visibleElements));
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
