import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar, FlatList } from "react-native";

import { Context as GameContext } from "../context/GameContext";
import Header from "../components/Header";
import SudokuBoard from "../components/SudokuBoard";
import Icon from "../components/Icon";
import GameLostModal from "../components/GameLostModal";

const GameScreen = ({ navigation }) => {
  const [key, setKey] = useState(1);
  const [levelDetail, setLevelDetail] = useState(
    navigation.getParam("gameLevel")
  );

  const {
    state,
    onNumberSelect,
    resetGame,
    undoAction,
    deleteAction,
    hintAction,
    pencilAction,
    checkGameState
  } = useContext(GameContext);

  StatusBar.setBarStyle("light-content");

  useEffect(() => {
    const navListener = navigation.addListener("didFocus", () =>
      StatusBar.setBarStyle("light-content")
    );
    return () => {
      navListener.remove();
      resetGame();
    };
  }, []);

  forceRemount = levelDetailItem => {
    resetGame();
    setKey(key + 1);
    setLevelDetail(levelDetailItem);
  };

  goToWinningScreen = seconds => {
    if (state.gameOver && state.errors < 3)
      navigation.navigate("Winning", {
        level: levelDetail.level,
        time: seconds
      });
  };

  return (
    <View style={{ flex: 1 }} key={key}>
      <Header onGameOver={goToWinningScreen} />

      <View style={style.containerStyle}>
        <Text style={style.textStyle}>{levelDetail.level.toUpperCase()}</Text>
        <Text style={style.textStyle}>ERRORS: {state.errors}/3</Text>
      </View>

      <GameLostModal
        visible={state.gameOver && state.errors === 3}
        forceRemount={forceRemount}
      />

      <View style={style.playAreaStyle}>
        <SudokuBoard visibleElements={levelDetail.visible} />
        {state.isPaused && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "#f0f0f0",
              justifyContent: "center",
              borderRadius: 10
            }}
          >
            <Text
              style={{
                fontFamily: "JosefinSans-Regular",
                fontSize: 28,
                textAlign: "center"
              }}
            >
              {state.gameOver
                ? state.errors === 3
                  ? ""
                  : "Congratulations!"
                : "Tap Play To Resume!"}
            </Text>
          </View>
        )}
      </View>
      <View style={style.iconContainerStyle}>
        <Icon
          icon="rotate-ccw"
          text="UNDO"
          onPress={undoAction}
          disabled={!state.isUndoLeft}
          sound
        />
        <Icon icon="trash" text="DELETE" onPress={deleteAction} />
        <Icon
          icon="edit-2"
          text="PENCIL"
          badge={state.isPencilActive ? "ON" : "OFF"}
          onPress={pencilAction}
          sound
        />
        <Icon
          icon="zap"
          text="HINT"
          onPress={hintAction}
          disabled={!state.hintsLeft}
          badge={state.hintsLeft}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <FlatList
          style={{ width: 350 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          keyExtractor={num => `Key-${num}`}
          renderItem={({ item }) => (
            <Text
              style={style.numberStyle}
              onPress={() => {
                onNumberSelect(item);
                checkGameState();
              }}
            >
              {item}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#5700a3",
    padding: 10
  },
  textStyle: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 15,
    color: "#ffffff"
  },
  playAreaStyle: { flex: 1, marginVertical: 20, marginHorizontal: 5 },
  iconContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    marginTop: 0
  },
  numberStyle: {
    backgroundColor: "#5700a3",
    width: 35,
    height: 60,
    textAlign: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 2,
    color: "#ffffff",
    fontFamily: "JosefinSans-Regular",
    fontSize: 30
  }
});

export default GameScreen;
