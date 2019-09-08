import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const ChallengesScreen = ({ navigation }) => {
  return (
    <View>
      <Text>ChallengesScreen</Text>
      <Button title="Game" onPress={() => navigation.navigate("Game")} />
    </View>
  );
};

const style = StyleSheet.create({});

export default ChallengesScreen;
