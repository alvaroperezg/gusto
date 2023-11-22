import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const NewPlanScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.content}>
          <Text>Vamos a crear un plan</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default NewPlanScreen;
