import React, { Component } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing
} from "react-native";

class SudokuSquare extends Component {
  constructor(props) {
    super(props);
    this.animateValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.timing(this.animateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.cubic
    }).start();
  }

  renderGrid = () => {
    return this.props.numberList.map((elem, index) => {
      let inlineStyle = {};
      if (elem.highlight) inlineStyle.backgroundColor = "#dbdbdb";
      if (elem.numberHighlight) inlineStyle.backgroundColor = "#bababa";
      if (elem.currentHighlight) inlineStyle.backgroundColor = "#d7c9ff";
      if (index >= 6) inlineStyle.borderBottomWidth = 0;
      if ((index + 1) % 3 === 0) inlineStyle.borderRightWidth = 0;
      return (
        <TouchableWithoutFeedback
          key={index}
          onPressIn={() => this.props.onCellSelect(this.props.grid, index)}
        >
          <Text style={{ ...style.numberStyle, ...inlineStyle }}>
            {elem.visible ? elem.value : ""}
          </Text>
        </TouchableWithoutFeedback>
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
