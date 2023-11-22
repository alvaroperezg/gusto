import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

// component imports
import NewPlanButton from "../components/Plans/NewPlanButton";

const PlansScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.content}>
          <Text>No hay planes, tetes</Text>
        </View>

        <NewPlanButton
          onPress={() => {
            /* esto me tiene que llevar a la pantalla de crear un plan */
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PlansScreen;

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
