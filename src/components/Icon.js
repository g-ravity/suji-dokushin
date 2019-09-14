import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Icon = ({ icon, text, labelStyle, onPress, disabled }) => {
  const inlineStyle = {};
  if (disabled) inlineStyle.opacity = 0.5;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={{ ...style.iconGroupStyle, ...inlineStyle }}>
        <Feather name={icon} size={20} />
        <Text style={{ ...style.iconTextStyle, ...labelStyle }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

Icon.defaultProps = {
  labelStyle: null,
  disabled: false
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
