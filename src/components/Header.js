import React, { useContext, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import SafeAreaView from "react-native-safe-area-view";
import { withNavigation } from "react-navigation";

import { Context as GameContext } from "../context/GameContext";
import { Context as TimerContext } from "../context/TimerContext";
import { convertSecondsToTime } from "../utils";

const Header = ({ navigation }) => {
  const { state: gameState, pauseGame, resumeGame } = useContext(GameContext);
  const { state: timerState, startTimer, stopTimer, resetTime } = useContext(
    TimerContext
  );

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
      resetTime();
    };
  }, []);

  useEffect(() => {
    if (gameState.gameOver) stopTimer();
  });

  renderButton = () => {
    return gameState.isPaused ? (
      <Button
        onPress={() => {
          startTimer();
          resumeGame();
        }}
      >
        <Feather name="play" size={30} style={{ color: "#ffffff" }} />
      </Button>
    ) : (
      <Button
        onPress={() => {
          stopTimer();
          pauseGame();
        }}
      >
        <Feather name="pause" size={30} style={{ color: "#ffffff" }} />
      </Button>
    );
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={style.headerStyle}>
      <Button onPress={() => navigation.pop()}>
        <Feather name="arrow-left" size={30} style={{ color: "#ffffff" }} />
      </Button>
      <Text style={style.timerStyle}>{convertSecondsToTime(timerState)}</Text>
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
  },
  timerStyle: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "JosefinSans-Regular"
  }
});

export default withNavigation(Header);
