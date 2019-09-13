import createDataContext from "./createDataContext";

const gameReducer = (state, action) => {
  switch (action.type) {
    case "pause_game":
      return { ...state, isPaused: true };
    case "resume_game":
      return { ...state, isPaused: false };
    case "cell_selected":
      return { ...state, currentCell: action.payload };
    case "number_selected": {
      const { grid, index } = state.currentCell;
      const numberInputList = [
        ...state.numberInputList,
        { grid, index, number: action.payload }
      ];
      return { ...state, numberInputList };
    }
    default:
      return state;
  }
};

const pauseGame = dispatch => () => dispatch({ type: "pause_game" });
const resumeGame = dispatch => () => dispatch({ type: "resume_game" });
const selectCell = dispatch => (grid, index, elem) =>
  dispatch({ type: "cell_selected", payload: { grid, index, elem } });
const onNumberSelect = dispatch => number =>
  dispatch({ type: "number_selected", payload: number });

export const { Context, Provider } = createDataContext(
  gameReducer,
  { pauseGame, resumeGame, selectCell, onNumberSelect },
  { isPaused: false, currentCell: null, numberInputList: [] }
);
