import React, { useState, useEffect } from "react";
import {SafeAreaView, StyleSheet, TouchableOpacity, View, ScrollView, Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PlanCard from "../components/Plans/PlanCard";
import { fetchRecipes, addPlanCard, updatePlan, createPlan} from "../utils/newPlanFunctions.js";

const NewPlanScreen = ({ navigation }) => {
  const [recipeIds, setRecipeIds] = useState([]);
  const [plans, setPlans] = useState([
    {
      date: new Date(),
      afternoonMeal: {
        people: ["Javi", "Diego", "Alvaro"],
        recipeId: "", // Placeholder
      },
      eveningMeal: {
        people: ["Javi", "Diego", "Alvaro"],
        recipeId: "", // Placeholder
      },
    },  
  ]);

  useEffect(() => {
    fetchRecipes(setRecipeIds);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView style={styles.content}>
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              plan={plan}
              onPlanChange={(updatedPlan) => updatePlan(index, updatedPlan, plans, setPlans)}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={() => addPlanCard(plans, setPlans)}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.createPlanButton} onPress={() =>createPlan(recipeIds, setRecipeIds, plans, navigation)}>
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
