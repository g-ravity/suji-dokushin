import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, StatusBar, FlatList } from "react-native";

import { Context as GameContext } from "../context/GameContext";
import Header from "../components/Header";
import SudokuBoard from "../components/SudokuBoard";
import Icon from "../components/Icon";

const GameScreen = ({ navigation }) => {
  const {
    state,
    onNumberSelect,
    resetGame,
    undoAction,
    deleteAction,
    hintAction
  } = useContext(GameContext);

  const { level, visible } = navigation.getParam("gameLevel");

  useEffect(() => () => resetGame(), []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={false} barStyle="light-content" />

      <View style={style.containerStyle}>
        <Text style={style.textStyle}>{level.toUpperCase()}</Text>
        <Text style={style.textStyle}>0/3</Text>
      </View>

      <View style={style.playAreaStyle}>
        <SudokuBoard visibleElements={visible} />
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
              Tap Play To Resume!
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
        />
        <Icon icon="trash" text="DELETE" onPress={deleteAction} />
        <Icon
          icon="edit-2"
          text="ON"
          labelStyle={{
            backgroundColor: "#2d2d2d",
            color: "#ffffff",
            paddingHorizontal: 7
          }}
        />
        <Icon
          icon="zap"
          text="HINT"
          onPress={hintAction}
          disabled={!state.hintsLeft}
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
              onPress={() => onNumberSelect(item)}
            >
              {item}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

GameScreen.navigationOptions = {
  header: <Header />
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
