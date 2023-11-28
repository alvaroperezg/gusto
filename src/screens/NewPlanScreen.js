import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PlanCard from "../components/Plans/PlanCard";

const NewPlanScreen = ({ navigation }) => {
  // Initialize plans with empty arrays for lunch and dinner
  const [plans, setPlans] = useState([
    {
      date: new Date(),
      lunch: ["Javi", "Diego", "Alvaro"],
      dinner: ["Javi", "Diego", "Alvaro"],
    },
  ]);

  const updatePlan = (index, updatedPlan) => {
    const newPlans = [...plans];
    newPlans[index] = updatedPlan;
    setPlans(newPlans);
    console.log(
      `updatePlan called. Index: ${index}, Updated Plan: `,
      updatedPlan
    );
  };

  const addPlanCard = () => {
    const lastPlanDate = plans[plans.length - 1].date;
    const newDate = new Date(lastPlanDate);
    newDate.setDate(newDate.getDate() + 1);
    // Set lunch and dinner as empty arrays for the new plan
    setPlans([
      ...plans,
      {
        date: newDate,
        lunch: ["Javi", "Diego", "Alvaro"],
        dinner: ["Javi", "Diego", "Alvaro"],
      },
    ]);
  };

  const createPlan = () => {
    console.log("Plans before serialization: ", plans);
    // Serialize the dates in the plans before navigation
    const serializablePlans = plans.map((plan) => ({
      ...plan,
      date: plan.date.toISOString(), // Convert date to ISO string
    }));

    console.log("Serializable Plans:", serializablePlans);

    navigation.replace("Plan Info", { plans: serializablePlans });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView style={styles.content}>
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              plan={plan}
              onPlanChange={(updatedPlan) => updatePlan(index, updatedPlan)}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addPlanCard}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.createPlanButton} onPress={createPlan}>
          <Text style={styles.createPlanButtonText}>Crear plan</Text>
        </TouchableOpacity>
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
  createPlanButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 9999,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  createPlanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NewPlanScreen;
