import React, { useContext, useEffect, useState } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { View, StyleSheet, StatusBar, Text, Image } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import LevelModal from "../components/LevelModal";
import { Context as FontContext } from "../context/FontContext";

const HomeScreen = ({ navigation }) => {
  const { state, loadFont } = useContext(FontContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const navListener = navigation.addListener("didFocus", () =>
      StatusBar.setBarStyle("dark-content")
    );
    loadFont();
    return () => navListener.remove();
  }, []);

  return (
    state.fontLoaded && (
      <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
        <View style={style.containerStyle}>
          <View style={{ alignItems: "center" }}>
            <Text style={style.subHeaderStyle}>Sūji</Text>
            <Text style={style.headerStyle}>Dokushin</Text>
          </View>
          <TouchableRipple
            onPress={() => setShowModal(true)}
            color="#2d2d2d"
          >
            <Image
              source={require("../../assets/images/play.png")}
              style={{ width: 200, height: 200 }}
            />
          </TouchableRipple>
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
        <LevelModal showModal={showModal} setShowModal={setShowModal} />
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
    color: "#2d2d2d",
    textTransform: 'uppercase'
  },
  btnTextStyle: {
    color: "#ffffff",
    fontFamily: "JosefinSans-Light",
    fontSize: 22,
    marginHorizontal: 10
  }
});

export default HomeScreen;
