import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, StatusBar, FlatList } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { Context as FontContext } from "../context/FontContext";
import Header from "../components/Header";
import SudokuBoard from "../components/SudokuBoard";

const GameScreen = () => {
  const { state, loadFont } = useContext(FontContext);

  useEffect(() => {
    loadFont();
  }, []);

  return (
    state.fontLoaded && (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} barStyle="light-content" />
        <View style={style.containerStyle}>
          <Text style={style.textStyle}>EASY</Text>
          <Text style={style.textStyle}>0/3</Text>
        </View>

        <SudokuBoard />
        <View style={style.iconContainerStyle}>
          <View style={style.iconGroupStyle}>
            <Feather name="rotate-ccw" size={20} />
            <Text style={style.iconTextStyle}>UNDO</Text>
          </View>
          <View style={style.iconGroupStyle}>
            <Feather name="trash" size={20} />
            <Text style={style.iconTextStyle}>DELETE</Text>
          </View>
          <View style={style.iconGroupStyle}>
            <Feather name="edit-2" size={20} />
            <Text
              style={{
                ...style.iconTextStyle,
                backgroundColor: "#2d2d2d",
                color: "#ffffff",
                paddingHorizontal: 7
              }}
            >
              ON
            </Text>
          </View>
          <View style={style.iconGroupStyle}>
            <MaterialCommunityIcons name="lightbulb-outline" size={20} />
            <Text style={style.iconTextStyle}>HINT</Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <FlatList
            style={{ width: 350 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            keyExtractor={num => `Key-${num}`}
            renderItem={({ item }) => (
              <View style={style.numberContainerStyle}>
                <Text style={style.numberTextStyle}>{item}</Text>
              </View>
            )}
          />
        </View>
      </View>
    )
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
  iconContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    marginTop: 0
  },
  iconGroupStyle: {
    alignItems: "center"
  },
  iconTextStyle: {
    fontFamily: "JosefinSans-Light",
    fontSize: 12,
    color: "#2d2d2d"
  },
  numberContainerStyle: {
    backgroundColor: "#5700a3",
    width: 35,
    height: 60,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 2
  },
  numberTextStyle: {
    color: "#ffffff",
    fontFamily: "JosefinSans-Regular",
    fontSize: 30
  }
});

export default GameScreen;
