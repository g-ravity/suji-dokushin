import React from "react";
import { Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";
import ChallengesScreen from "./src/screens/ChallengesScreen";
import StatisticsScreen from "./src/screens/StatisticsScreen";
import { Provider as FontProvider } from "./src/context/FontContext";
import { Provider as GameProvider } from "./src/context/GameContext";

const tabConfig = {
  iconStyle: {
    fontSize: 25
  },
  labelStyle: {
    fontSize: 15
  }
};

const navigator = createStackNavigator(
  {
    mainFlow: createMaterialBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarLabel: <Text style={tabConfig.labelStyle}>Home</Text>,
            tabBarIcon: ({ tintColor }) => (
              <Feather
                name="home"
                style={tabConfig.iconStyle}
                color={tintColor}
              />
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
        Challenges: {
          screen: ChallengesScreen,
          navigationOptions: {
            tabBarLabel: <Text style={tabConfig.labelStyle}>Challenges</Text>,
            tabBarIcon: ({ tintColor }) => (
              <Feather
                name="award"
                style={tabConfig.iconStyle}
                color={tintColor}
              />
            )
          }
        }
      },
      {
        initialRouteName: "Home",
        order: ["Home", "Statistics", "Challenges"],
        barStyle: {
          backgroundColor: "#2d2d2d",
          height: 70,
          justifyContent: "center"
        },
        shifting: true
      }
    ),
    Game: GameScreen
  },
  {
    // initialRouteName: "Game",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <PaperProvider>
      <FontProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </FontProvider>
    </PaperProvider>
  );
};
