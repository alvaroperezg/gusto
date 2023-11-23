import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PlanCard from "../components/Plans/PlanCard";

const NewPlanScreen = ({ navigation }) => {
  // state for array of PlanCards
  const [planCards, setPlanCards] = useState([
    <PlanCard key={0} initialDate={new Date()} />,
  ]);

  // function to add a new card
  const addPlanCard = () => {
    const newPlanCard = (
      <PlanCard key={planCards.length} initialDate={new Date()} />
    );
    setPlanCards([...planCards, newPlanCard]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView style={styles.content}>
          {planCards.map((card) => card)}
          <TouchableOpacity style={styles.addButton} onPress={addPlanCard}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </ScrollView>
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
    padding: 20,
  },
  addButton: {
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 9999,
    alignItems: "center",
  },
});

export default NewPlanScreen;
