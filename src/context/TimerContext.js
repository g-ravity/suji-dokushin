import createDataContext from "./createDataContext";

const timeReducer = (state, action) => {
  switch (action.type) {
    case "update_time":
      return state + 1;
    case "pause_time":
      let id = window.setInterval(function() {}, 0);
      while (id--) {
        window.clearInterval(id);
      }
      return state;
    case "reset_time":
      return 0;
    default:
      return state;
  }
};

const startTimer = dispatch => () => {
  setInterval(() => {
    dispatch({ type: "update_time" });
  }, 1000);
};

const stopTimer = dispatch => () => {
  dispatch({ type: "pause_time" });
};

const resetTime = dispatch => () => {
  dispatch({ type: "reset_time" });
};

export const { Context, Provider } = createDataContext(
  timeReducer,
  {
    startTimer,
    stopTimer,
    resetTime
  },
  0
);
