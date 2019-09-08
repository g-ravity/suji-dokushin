import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

const GameScreen = () => {
  return (
    <View>
      <Text>GameScreen</Text>
    </View>
  );
};

GameScreen.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <View
        style={{
          height: 100,
          backgroundColor: "#2d2d2d",
          justifyContent: "center"
        }}
      >
        <Button onPress={() => navigation.pop()}>
          <Feather name="arrow-left" size={20} style={{ color: "#ffffff" }} />
        </Button>
      </View>
    )
  };
};

const style = StyleSheet.create({});

export default GameScreen;
