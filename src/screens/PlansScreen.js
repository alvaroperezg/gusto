import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

// component imports
import NewPlanButton from "../components/Plans/NewPlanButton";

const PlansScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.content}>
          {/* aquí tenemos que cargar planes ya hechos que estén guardados en la base datos, mapeados a un componente */}
          <Text>No hay planes, tetes</Text>
        </View>
        <NewPlanButton onPress={() => navigation.navigate("Nuevo plan")} />
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

export default PlansScreen;
