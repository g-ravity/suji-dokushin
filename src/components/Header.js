import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import SafeAreaView from "react-native-safe-area-view";
import { withNavigation } from "react-navigation";

import { Context as GameContext } from "../context/GameContext";
import Timer from "./Timer";

const Header = ({ navigation }) => {
  const { state, pauseGame, resumeGame } = useContext(GameContext);

  renderButton = () => {
    return state.isPaused ? (
      <Button onPress={resumeGame}>
        <Feather name="play" size={30} style={{ color: "#ffffff" }} />
      </Button>
    ) : (
      <Button onPress={pauseGame}>
        <Feather name="pause" size={30} style={{ color: "#ffffff" }} />
      </Button>
    );
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={style.headerStyle}>
      <Button onPress={() => navigation.pop()}>
        <Feather name="arrow-left" size={30} style={{ color: "#ffffff" }} />
      </Button>
      <Timer isPaused={state.isPaused} />
      {renderButton()}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerStyle: {
    height: 70,
    backgroundColor: "#2d2d2d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default withNavigation(Header);
