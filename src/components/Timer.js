import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

const convertSecondsToTime = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  seconds = (seconds % 3600) % 60;
  let time = "";
  if (hours > 0) time += `${hours}:`;
  if (minutes >= 10) time += `${minutes}:`;
  else time += `0${minutes}:`;
  if (seconds >= 10) time += seconds;
  else time += `0${seconds}`;
  return time;
};

let timer;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    this.updateTimer();
  }

  componentDidUpdate() {
    if (!this.props.isPaused) {
      clearTimeout(timer);
      this.updateTimer();
    } else clearTimeout(timer);
  }

  componentWillUnmount() {
    clearTimeout(timer);
  }

  updateTimer = () => {
    timer = setTimeout(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  };

  render() {
    return (
      <Text style={style.timerStyle}>
        {convertSecondsToTime(this.state.seconds)}
      </Text>
    );
  }
}

const style = StyleSheet.create({
  timerStyle: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "JosefinSans-Regular"
  }
});

export default Timer;
