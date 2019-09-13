import shuffleList from "./shuffleList";

export default hideSudokuCells = (arr, visible) => {
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
};
