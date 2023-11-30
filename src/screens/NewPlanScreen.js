import React, { useState, useEffect } from "react";

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

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firestore/config";

import { createPlanning } from "../../firestore/funciones.js";

const NewPlanScreen = ({ navigation }) => {
  // Initialize plans
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

  const [recipeIds, setRecipeIds] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const ids = querySnapshot.docs.map((doc) => doc.id);
      setRecipeIds(ids);
    };

    fetchRecipes();
  }, []);

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

    setPlans([
      ...plans,
      {
        date: newDate,
        afternoonMeal: {
          people: ["Javi", "Diego", "Alvaro"],
          recipeId: "", // Placeholder for the recipe ID
        },
        eveningMeal: {
          people: ["Javi", "Diego", "Alvaro"],
          recipeId: "", // Placeholder for the recipe ID
        },
      },
    ]);
  };

  const createPlan = async () => {
    console.log("Plans before serialization: ", plans);

    const planningData = {
      dates: plans.map((plan) => ({
        date: plan.date.toISOString().split("T")[0],
        afternoonMeal: {
          people: plan.afternoonMeal.people,
          recipeId: recipeIds[Math.floor(Math.random() * recipeIds.length)],
        },
        eveningMeal: {
          people: plan.eveningMeal.people,
          recipeId: recipeIds[Math.floor(Math.random() * recipeIds.length)],
        },
      })),
    };

    try {
      console.log("Creating Planning Data:", planningData);
      const docRef = await createPlanning(planningData);
      console.log("Planning created with ID:", docRef.id);
      navigation.replace("Plan Info", { planningId: docRef.id });
    } catch (error) {
      console.error("Error creating planning: ", error);
      // Optionally, provide feedback to the user that an error occurred
    }
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
