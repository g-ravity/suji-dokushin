import createDataContext from "./createDataContext";

const gameReducer = (state, action) => {
  switch (action.type) {
    case "pause_game":
      return { ...state, isPaused: true };
    case "resume_game":
      return { ...state, isPaused: false };
    case "reset_game":
      return {
        isPaused: false,
        currentCell: { grid: 0, index: 0 },
        userInputList: [],
        sudoku: []
      };
    case "cell_selected":
      return { ...state, currentCell: action.payload };
    case "number_selected": {
      const { grid, index } = state.currentCell;
      const row = Math.floor(grid / 3) * 3 + Math.floor(index / 3);
      const col = (grid % 3) * 3 + (index % 3);
      if (state.sudoku[row][col].visible) return state;
      const prevValue = state.sudoku[row][col].inputValue;
      if (prevValue === action.payload) action.payload = "";
      const sudoku = [...state.sudoku];
      sudoku[row][col].inputValue = action.payload;
      const userInputList = [
        ...state.userInputList,
        { grid, index, value: action.payload }
      ];
      return { ...state, userInputList, sudoku };
    }
    case "store_sudoku":
      return { ...state, sudoku: action.payload };
    default:
      return state;
  }
};

const pauseGame = dispatch => () => dispatch({ type: "pause_game" });
const resumeGame = dispatch => () => dispatch({ type: "resume_game" });
const resetGame = dispatch => () => dispatch({ type: "reset_game" });
const selectCell = dispatch => (grid, index) =>
  dispatch({ type: "cell_selected", payload: { grid, index } });
const onNumberSelect = dispatch => number =>
  dispatch({ type: "number_selected", payload: number });
const storeSudoku = dispatch => sudoku =>
  dispatch({ type: "store_sudoku", payload: sudoku });

export const { Context, Provider } = createDataContext(
  gameReducer,
  { pauseGame, resumeGame, resetGame, selectCell, onNumberSelect, storeSudoku },
  {
    isPaused: false,
    currentCell: { grid: 0, index: 0 },
    userInputList: [],
    sudoku: []
  }
);
