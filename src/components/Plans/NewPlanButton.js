import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NewPlanButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 32,
    bottom: 32,
    backgroundColor: "green",
    width: 64,
    height: 64,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewPlanButton;
