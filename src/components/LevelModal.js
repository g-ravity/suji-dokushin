import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";
import { Button } from "react-native-paper";
import { withNavigation } from "react-navigation";

const LevelModal = ({ showModal, setShowModal, navigation }) => {
  return (
    <Modal
      animationType="slide"
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
                  gameLevel: item
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
  );
};

const style = StyleSheet.create({
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

export default withNavigation(LevelModal);
