import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SudokuSquare = ({ numberList }) => {
  renderGrid = () => {
    return numberList.map((num, index) => {
      let inlineStyle = {};
      if (index >= 6) inlineStyle.borderBottomWidth = 0;
      if ((index + 1) % 3 === 0) inlineStyle.borderRightWidth = 0;
      return (
        <Text key={index} style={{ ...style.numberStyle, ...inlineStyle }}>
          {num}
        </Text>
      );
    });
  };

  return <View style={style.boxStyle}>{renderGrid()}</View>;
};

const style = StyleSheet.create({
  boxStyle: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    margin: 2,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    flexBasis: "30%",
    height: "32%"
  },
  numberStyle: {
    flex: 1,
    flexBasis: "33%",
    height: "33%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    textAlign: "center",
    color: "#2d2d2d",
    borderColor: "#c2c2c2"
  }
});

export default SudokuSquare;
