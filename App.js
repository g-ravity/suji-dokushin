import React from "react";
import { Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";
import ChallengesScreen from "./src/screens/ChallengesScreen";
import StatisticsScreen from "./src/screens/StatisticsScreen";

const tabConfig = {
  iconStyle: {
    fontSize: 25
  },
  labelStyle: {
    fontSize: 15
  }
};

const navigator = createMaterialBottomTabNavigator(
  {
    homeFlow: {
      screen: createStackNavigator({
        Home: HomeScreen,
        Game: GameScreen
      }),
      navigationOptions: {
        tabBarLabel: <Text style={tabConfig.labelStyle}>Home</Text>,
        tabBarIcon: ({ tintColor }) => (
          <Feather name="home" style={tabConfig.iconStyle} color={tintColor} />
        )
      }
    },
    Statistics: {
      screen: StatisticsScreen,
      navigationOptions: {
        tabBarLabel: <Text style={tabConfig.labelStyle}>Statistics</Text>,
        tabBarIcon: ({ tintColor }) => (
          <Feather
            name="bar-chart"
            style={tabConfig.iconStyle}
            color={tintColor}
          />
        )
      }
    },
    challengesFlow: {
      screen: createStackNavigator({
        Challenges: ChallengesScreen,
        Game: GameScreen
      }),
      navigationOptions: {
        tabBarLabel: <Text style={tabConfig.labelStyle}>Challenges</Text>,
        tabBarIcon: ({ tintColor }) => (
          <Feather name="award" style={tabConfig.iconStyle} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "homeFlow",
    order: ["homeFlow", "Statistics", "challengesFlow"],
    barStyle: {
      backgroundColor: "red",
      height: 70,
      justifyContent: "center"
    },
    shifting: true
  }
);

export default createAppContainer(navigator);
