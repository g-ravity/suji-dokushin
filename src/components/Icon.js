import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { withBadge, Icon as IconNative } from "react-native-elements";
import { Feather } from "@expo/vector-icons";

const Icon = ({ icon, text, labelStyle, onPress, disabled, badge }) => {
  const inlineStyle = {};
  let BadgedIcon;
  if (disabled) inlineStyle.opacity = 0.5;
  if (badge) {
    let badgeStyle;
    if (typeof badge === "string") {
      badgeStyle = {
        backgroundColor: "#5700a3",
        marginRight: -13,
        marginTop: -5
      };
    } else {
      badgeStyle = {
        backgroundColor: "#5700a3",
        marginRight: -2,
        marginTop: -5
      };
    }
    BadgedIcon = withBadge(badge, {
      badgeStyle,
      textStyle: {
        fontFamily: "JosefinSans-Regular",
        marginTop: -3
      }
    })(IconNative);
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={{ ...style.iconGroupStyle, ...inlineStyle }}>
        {badge ? (
          <BadgedIcon type="feather" size={20} name={icon} />
        ) : (
          <Feather name={icon} size={20} />
        )}
        <Text style={{ ...style.iconTextStyle, ...labelStyle }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

Icon.defaultProps = {
  labelStyle: null,
  disabled: false,
  badge: null
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
