import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-paper";
import { withNavigation } from "react-navigation";

const GameLostModal = ({ visible, navigation }) => {
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
          <Text h3 h3Style={{ marginBottom: 15 }}>
            Game Over
          </Text>
          <Text style={style.modalTextStyle}>
            You have made 3 mistakes and lost this game
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Home")}
            style={{ marginVertical: 15 }}
            color="#5700a3"
          >
            NEW GAME
          </Button>
        </View>
      </View>
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
    width: 250,
    backgroundColor: "#ffffff",
    padding: 20
  },
  modalTextStyle: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 20
  }
});

export default withNavigation(GameLostModal);
