import React, { useState, useEffect } from "react";
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

const Timer = ({ isPaused }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isPaused) updateTimer();
    else stopTimer();
  });

  const updateTimer = () => {
    timer = setTimeout(() => setTime(time + 1), 1000);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  return <Text style={style.timerStyle}>{convertSecondsToTime(time)}</Text>;
};

const style = StyleSheet.create({
  timerStyle: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "JosefinSans-Regular"
  }
});

export default Timer;
