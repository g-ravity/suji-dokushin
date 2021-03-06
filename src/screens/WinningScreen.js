import React, { Component } from "react";
import { Text, View, StyleSheet, Animated, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import { Feather } from "@expo/vector-icons";
import { Audio } from "expo-av";

import LevelModal from "../components/LevelModal";
import { convertSecondsToTime } from "../utils";

const playSound = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require("../../assets/sounds/win.mp3"));
    await soundObject.playAsync();
  } catch (error) {
    console.log(error);
  }
};

class WinningScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.springValue = new Animated.Value(0.3);
    this.navListener = null;
  }

  spring = () => {
    this.springValue.setValue(0.3);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1
    }).start();
  };

  setShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  componentDidMount() {
    playSound();
    this.spring();
    this.navListener = this.props.navigation.addListener("didFocus", () =>
      StatusBar.setBarStyle("dark-content")
    );
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    return (
      <SafeAreaView forceInset={{ top: "always" }} style={style.containerStyle}>
        <View>
          <Text style={style.headerStyle}>Best Time</Text>
          <View style={style.rowContainerStyle}>
            <Feather
              name="clock"
              size={20}
              style={{ marginRight: 10, marginBottom: -7 }}
            />
            <Text style={style.subHeaderStyle}>00:00</Text>
          </View>
        </View>
        <Animated.Image
          source={require("../../assets/images/winning-laurel.png")}
          style={{
            ...style.imageStyle,
            transform: [{ scale: this.springValue }]
          }}
        />
        <View>
          <Text style={style.subHeaderStyle}>
            {this.props.navigation.getParam("level")}
          </Text>
          <Text style={style.headerStyle}>
            {convertSecondsToTime(this.props.navigation.getParam("time"))}
          </Text>
        </View>
        <View
          style={{
            ...style.rowContainerStyle,
            width: "100%",
            justifyContent: "space-around",
            marginBottom: 20
          }}
        >
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate("Home")}
            color="#5700a3"
            style={{ flex: 1, marginRight: 10, marginLeft: 20 }}
          >
            <Text style={style.buttonTextStyle}>Home</Text>
          </Button>
          <Button
            mode="contained"
            color="#5700a3"
            style={{ flex: 1, marginRight: 20, marginLeft: 10 }}
            onPress={() => this.setState({ showModal: true })}
          >
            <Text style={style.buttonTextStyle}>New Game</Text>
          </Button>
        </View>
        <LevelModal
          showModal={this.state.showModal}
          setShowModal={this.setShowModal}
        />
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  headerStyle: {
    fontSize: 40,
    fontFamily: "JosefinSans-Light",
    color: "#5700a3",
    marginVertical: 10,
    textTransform: "uppercase"
  },
  subHeaderStyle: {
    fontSize: 24,
    fontFamily: "JosefinSans-Regular",
    textAlign: "center"
  },
  imageStyle: {
    width: 300,
    height: 300,
    marginLeft: -20
  },
  rowContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTextStyle: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 18,
    textTransform: "uppercase"
  }
});

export default WinningScreen;
