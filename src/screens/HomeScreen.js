import React, { useContext, useEffect } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import { Context as FontContext } from "../context/FontContext";

const HomeScreen = ({ navigation }) => {
  const { state, loadFont } = useContext(FontContext);

  useEffect(() => {
    loadFont();
  }, []);

  return (
    state.fontLoaded && (
      <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
        <StatusBar hidden={false} barStyle="dark-content" />
        <View style={style.containerStyle}>
          <View style={{ alignItems: "center" }}>
            <Text style={style.subHeaderStyle}>Sūji</Text>
            <Text style={style.headerStyle}>DOKUSHIN</Text>
          </View>
          <Button onPress={() => navigation.navigate("Game")} color="#2d2d2d">
            <Feather
              name="play-circle"
              size={130}
              style={{ color: "#2d2d2d" }}
            />
          </Button>
          <Button
            mode="contained"
            color="#2d2d2d"
            onPress={() => navigation.navigate("Game")}
            contentStyle={{ padding: 15 }}
          >
            <Text style={style.btnTextStyle}>Today's Challenge &nbsp;</Text>
            <Feather name="calendar" size={20} style={{ color: "#ffffff" }} />
          </Button>
        </View>
      </SafeAreaView>
    )
  );
};

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  subHeaderStyle: {
    fontSize: 32,
    fontFamily: "JosefinSans-Light",
    color: "#2d2d2d"
  },
  headerStyle: {
    fontSize: 40,
    fontFamily: "JosefinSans-Bold",
    color: "#2d2d2d"
  },
  btnTextStyle: {
    color: "#ffffff",
    fontFamily: "JosefinSans-Light",
    fontSize: 22,
    marginHorizontal: 10
  }
});

export default HomeScreen;
