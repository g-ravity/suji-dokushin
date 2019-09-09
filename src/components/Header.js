import React, { useContext, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import SafeAreaView from "react-native-safe-area-view";
import { withNavigation } from "react-navigation";

import { Context as FontContext } from "../context/FontContext";

const Header = ({ navigation }) => {
  const { state, loadFont } = useContext(FontContext);

  useEffect(() => {
    loadFont();
  }, []);

  return (
    state.fontLoaded && (
      <SafeAreaView forceInset={{ top: "always" }} style={style.headerStyle}>
        <Button onPress={() => navigation.pop()}>
          <Feather name="arrow-left" size={30} style={{ color: "#ffffff" }} />
        </Button>
        <Text style={style.timerStyle}>3:05</Text>
        <Button>
          <Feather name="pause" size={30} style={{ color: "#ffffff" }} />
        </Button>
      </SafeAreaView>
    )
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
