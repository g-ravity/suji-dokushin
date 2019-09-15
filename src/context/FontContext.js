import * as Font from "expo-font";

import createDataContext from "./createDataContext";

const fontReducer = (state, action) => {
  switch (action.type) {
    case "font_loaded":
      return { fontLoaded: true };
    default:
      return state;
  }
};

const loadFont = dispatch => async () => {
  await Font.loadAsync({
    "JosefinSans-Bold": require("../../assets/fonts/JosefinSans-Bold.ttf"),
    "JosefinSans-Light": require("../../assets/fonts/JosefinSans-Light.ttf"),
    "JosefinSans-Regular": require("../../assets/fonts/JosefinSans-Regular.ttf")
  });
  dispatch({ type: "font_loaded" });
};

export const { Context, Provider } = createDataContext(
  fontReducer,
  { loadFont },
  { fontLoaded: false }
);
