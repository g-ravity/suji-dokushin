import createDataContext from "./createDataContext";

const getRowAndCol = cell => {
  const { grid, index } = cell;
  const row = Math.floor(grid / 3) * 3 + Math.floor(index / 3);
  const col = (grid % 3) * 3 + (index % 3);
  return { row, col };
};

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
        sudoku: [],
        hintsLeft: 3,
        isUndoLeft: false
      };
    case "cell_selected":
      return { ...state, currentCell: action.payload };
    case "number_selected": {
      const { row, col } = getRowAndCol(state.currentCell);
      if (state.sudoku[row][col].visible) return state;
      const prevValue = state.sudoku[row][col].inputValue;
      if (prevValue === action.payload) action.payload = "";
      const sudoku = [...state.sudoku];
      sudoku[row][col].inputValue = action.payload;
      const userInputList = [
        ...state.userInputList,
        { ...state.currentCell, value: action.payload }
      ];
      return {
        ...state,
        userInputList,
        sudoku,
        isUndoLeft: Boolean(userInputList.length)
      };
    }
    case "store_sudoku":
      return { ...state, sudoku: action.payload };
    case "undo": {
      if (!state.userInputList.length) return state;
      const userInputList = state.userInputList.filter(
        (cur, index) => index !== state.userInputList.length - 1
      );
      const lastInput = state.userInputList.pop();
      const currentCell = { grid: lastInput.grid, index: lastInput.index };
      const sudoku = [...state.sudoku];
      const { row, col } = getRowAndCol(currentCell);
      sudoku[row][col].inputValue = "";
      userInputList.forEach(cur => {
        if (cur.grid === currentCell.grid && cur.index === currentCell.index) {
          sudoku[row][col].inputValue = cur.value;
        }
      });
      return {
        ...state,
        sudoku,
        currentCell,
        userInputList,
        isUndoLeft: Boolean(userInputList.length)
      };
    }
    case "delete": {
      const { row, col } = getRowAndCol(state.currentCell);
      const sudoku = [...state.sudoku];
      if (!sudoku[row][col].visible) {
        sudoku[row][col].inputValue = "";
        const userInputList = [
          ...state.userInputList,
          { ...state.currentCell, value: "" }
        ];
        return {
          ...state,
          sudoku,
          userInputList,
          isUndoLeft: Boolean(userInputList.length)
        };
      }
      return state;
    }
    case "hint": {
      const { row, col } = getRowAndCol(state.currentCell);
      const sudoku = [...state.sudoku];
      sudoku[row][col].visible = true;
      return { ...state, sudoku, hintsLeft: state.hintsLeft - 1 };
    }
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
const undoAction = dispatch => () => dispatch({ type: "undo" });
const deleteAction = dispatch => () => dispatch({ type: "delete" });
const hintAction = dispatch => () => dispatch({ type: "hint" });

export const { Context, Provider } = createDataContext(
  gameReducer,
  {
    pauseGame,
    resumeGame,
    resetGame,
    selectCell,
    onNumberSelect,
    storeSudoku,
    undoAction,
    deleteAction,
    hintAction
  },
  {
    isPaused: false,
    currentCell: { grid: 0, index: 0 },
    userInputList: [],
    sudoku: [],
    hintsLeft: 3,
    isUndoLeft: false
  }
);
