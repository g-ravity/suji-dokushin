import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Icon = ({ icon, text, labelStyle }) => {
  return (
    <View style={style.iconGroupStyle}>
      <Feather name={icon} size={20} />
      <Text style={{ ...style.iconTextStyle, ...labelStyle }}>{text}</Text>
    </View>
  );
};

Icon.defaultProps = {
  labelStyle: null
};

const style = StyleSheet.create({
  iconGroupStyle: {
    alignItems: "center"
  },
  iconTextStyle: {
    fontFamily: "JosefinSans-Light",
    fontSize: 12,
    color: "#2d2d2d"
  }
});

export default Icon;
