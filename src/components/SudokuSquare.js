import React, { Component } from "react";
import { Text, StyleSheet, Animated, Easing } from "react-native";

import { Context as GameContext } from "../context/GameContext";

const configureStyle = (elem, index) => {
  let style = {};
  if (elem.highlight) style.backgroundColor = "#dbdbdb";
  if (elem.numberHighlight) style.backgroundColor = "#bababa";
  if (elem.currentHighlight) style.backgroundColor = "#d7c9ff";
  if (index >= 6) style.borderBottomWidth = 0;
  if ((index + 1) % 3 === 0) style.borderRightWidth = 0;
  return style;
};

class SudokuSquare extends Component {
  constructor(props) {
    super(props);
    this.animateValue = new Animated.Value(0);
  }

  static contextType = GameContext;

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.timing(this.animateValue, {
      toValue: 1,
      duration: 600,
      easing: Easing.cubic
    }).start();
  }

  renderUserInput = index => {
    const { numberInputList } = this.context.state;
    for (cur of numberInputList) {
      if (cur.grid === this.props.grid && cur.index === index) {
        return cur.number;
      }
    }
    return "";
  };

  renderHighlights = arr => {
    const { currentCell } = this.context.state;

    if (!currentCell) return;

    for (i = 0; i < 9; i++) {
      arr[i].highlight = arr[i].currentHighlight = arr[
        i
      ].numberHighlight = false;
    }

    for (i = 0; i < 9; i++) {
      if (
        currentCell.elem.visible &&
        arr[i].value === currentCell.elem.value &&
        arr[i].visible
      )
        arr[i].numberHighlight = true;
    }

    if (this.props.grid === currentCell.grid) {
      for (let i = 0; i < 9; i++) {
        arr[i].highlight = true;
        if (i === currentCell.index) arr[i].currentHighlight = true;
      }
    } else {
      if (this.props.grid % 3 === currentCell.grid % 3) {
        for (let i = 0; i < 9; i++) {
          if (i % 3 === currentCell.index % 3) arr[i].highlight = true;
        }
      }
      if (
        Math.floor(this.props.grid / 3) === Math.floor(currentCell.grid / 3)
      ) {
        for (let i = 0; i < 9; i++) {
          if (Math.floor(i / 3) === Math.floor(currentCell.index / 3))
            arr[i].highlight = true;
        }
      }
    }
  };

  renderGrid = () => {
    this.renderHighlights(this.props.numberList);
    return this.props.numberList.map((elem, index) => {
      const inlineStyle = configureStyle(elem, index);
      return (
        <Text
          style={{ ...style.numberStyle, ...inlineStyle }}
          key={index}
          onPress={() => this.context.selectCell(this.props.grid, index, elem)}
        >
          {elem.visible ? elem.value : this.renderUserInput(index)}
        </Text>
      );
    });
  };

  render() {
    const height = this.animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "32%"]
    });
    const opacity = this.animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    return (
      <Animated.View style={{ ...style.boxStyle, height, opacity }}>
        {this.renderGrid()}
      </Animated.View>
    );
  }
}

const style = StyleSheet.create({
  boxStyle: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    margin: 2,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    flexBasis: "30%"
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
