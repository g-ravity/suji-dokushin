import createDataContext from "./createDataContext";

const gameReducer = (state, action) => {
  switch (action.type) {
    case "pause_game":
      return { ...state, isPaused: true };
    case "resume_game":
      return { ...state, isPaused: false };
    default:
      return state;
  }
};

const pauseGame = dispatch => () => dispatch({ type: "pause_game" });
const resumeGame = dispatch => () => dispatch({ type: "resume_game" });

export const { Context, Provider } = createDataContext(
  gameReducer,
  { pauseGame, resumeGame },
  { isPaused: false }
);
