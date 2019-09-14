import shuffleList from "./shuffleList";

const calculateRow = (arr, row) => {
  const rowArr = [];
  for (let num = 0; num < 9; num++) rowArr.push(arr[row][num].value);
  return rowArr;
};

const calculateColumn = (arr, col) => {
  const colArr = [];
  for (let num = 0; num < 9; num++) colArr.push(arr[num][col].value);
  return colArr;
};

const calculateGrid = (arr, row, col) => {
  const gridArr = [];
  const rowNum = Math.floor(row / 3) * 3;
  const colNum = Math.floor(col / 3) * 3;
  for (let i = rowNum; i < rowNum + 3; i++) {
    for (let j = colNum; j < colNum + 3; j++) gridArr.push(arr[i][j].value);
  }
  return gridArr;
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

export default generateSudoku = () => {
  const arr = [];
  let i, j;
  for (i = 0; i < 9; i++) {
    arr.push([]);
    for (j = 0; j < 9; j++)
      arr[i].push({
        value: 0,
        visible: false,
        highlight: false,
        currentHighlight: false,
        numberHighlight: false
      });
  }

  setupDiagonalGrids(arr);

  const stack = [];
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (arr[i][j].value === 0) {
        let isAllowed = false;
        while (!isAllowed) {
          const rowArr = calculateRow(arr, i);
          const colArr = calculateColumn(arr, j);
          const gridArr = calculateGrid(arr, i, j);
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

  return arr;
};
