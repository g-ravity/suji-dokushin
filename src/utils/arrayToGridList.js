export default arrayToGridList = arr => {
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
