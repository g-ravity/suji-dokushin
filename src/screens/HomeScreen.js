import React, { useContext, useEffect, useState } from "react";
import SafeAreaView from "react-native-safe-area-view";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  Modal,
  TouchableOpacity
} from "react-native";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import { Context as FontContext } from "../context/FontContext";

const HomeScreen = ({ navigation }) => {
  const { state, loadFont } = useContext(FontContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadFont();
  }, []);

  return (
    state.fontLoaded && (
      <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
        <StatusBar hidden={false} barStyle="dark-content" />
        <View style={style.containerStyle}>
          <View style={{ alignItems: "center" }}>
            <Text style={style.subHeaderStyle}>Sūji</Text>
            <Text style={style.headerStyle}>DOKUSHIN</Text>
          </View>
          <Button onPress={() => setShowModal(true)} color="#2d2d2d">
            <Feather
              name="play-circle"
              size={130}
              style={{ color: "#5700a3" }}
            />
          </Button>
          <Button
            mode="contained"
            color="#2d2d2d"
            onPress={() => navigation.navigate("Game")}
            contentStyle={{ padding: 15 }}
          >
            <Text style={style.btnTextStyle}>Today's Challenge &nbsp;</Text>
            <Feather name="calendar" size={20} style={{ color: "#ffffff" }} />
          </Button>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showModal}
          transparent
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <TouchableOpacity
            onPress={() => setShowModal(!showModal)}
            style={style.modalBackgroundStyle}
          ></TouchableOpacity>
          <View style={style.modalContainerStyle}>
            <FlatList
              data={[
                {
                  level: "Easy",
                  visible: 38
                },
                {
                  level: "Medium",
                  visible: 30
                },
                {
                  level: "Hard",
                  visible: 25
                },
                {
                  level: "Expert",
                  visible: 22
                }
              ]}
              keyExtractor={listItem => listItem.level}
              renderItem={({ item }) => (
                <Button
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate("Game", {
                      visibleElements: item.visible
                    });
                  }}
                  color="#2d2d2d"
                >
                  <Text style={style.modalTextStyle}>{item.level}</Text>
                </Button>
              )}
            />
          </View>
        </Modal>
      </SafeAreaView>
    )
  );
};

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  subHeaderStyle: {
    fontSize: 32,
    fontFamily: "JosefinSans-Light",
    color: "#2d2d2d"
  },
  headerStyle: {
    fontSize: 40,
    fontFamily: "JosefinSans-Bold",
    color: "#2d2d2d"
  },
  btnTextStyle: {
    color: "#ffffff",
    fontFamily: "JosefinSans-Light",
    fontSize: 22,
    marginHorizontal: 10
  },
  modalBackgroundStyle: {
    flex: 1,
    opacity: 0.4,
    backgroundColor: "#2d2d2d"
  },
  modalContainerStyle: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 10
  },
  modalTextStyle: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 22,
    marginVertical: 10,
    marginHorizontal: 20
  }
});

export default HomeScreen;
