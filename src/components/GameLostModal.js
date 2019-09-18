import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-paper";
import { withNavigation } from "react-navigation";

import LevelModal from "../components/LevelModal";

const GameLostModal = ({ visible, forceRemount, navigation }) => {
  const [showLevelModal, setShowLevelModal] = useState(false);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={style.modalBackgroundStyle}>
        <View style={style.modalContainerStyle}>
          <Text h3 h3Style={{ marginBottom: 10, textTransform: "uppercase" }}>
            Game Over
          </Text>
          <Text style={style.modalTextStyle}>
            You have made 3 errors and lost this game
          </Text>
          <View style={style.buttonContainerStyle}>
            <Text
              style={style.buttonTextStyle}
              onPress={() => navigation.navigate("Home")}
            >
              Home
            </Text>
            <Text
              style={style.buttonTextStyle}
              onPress={() => setShowLevelModal(true)}
            >
              New Game
            </Text>
          </View>
        </View>
      </View>
      <LevelModal
        showModal={showLevelModal}
        setShowModal={setShowLevelModal}
        screen="Game"
        forceRemount={forceRemount}
      />
    </Modal>
  );
};

const style = StyleSheet.create({
  modalBackgroundStyle: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalContainerStyle: {
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20
  },
  modalTextStyle: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 20
  },
  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  buttonTextStyle: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 18,
    textTransform: "uppercase",
    color: "#5700a3"
  }
});

export default withNavigation(GameLostModal);
