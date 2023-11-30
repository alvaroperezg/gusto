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

import {
  createPlanning,
  fetchRecipeDetails,
} from "../../firestore/funciones.js";
import { adjustIngredientQuantities } from "../utils/adjustedQuantities.js";

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

  const aggregateIngredients = (plans) => {
    const allIngredients = {};

    plans.forEach((plan) => {
      // Aggregate ingredients from afternoon and evening meals
      [
        ...plan.afternoonMeal.adjustedIngredients,
        ...plan.eveningMeal.adjustedIngredients,
      ].forEach((ingredient) => {
        if (allIngredients[ingredient.ingredient_id]) {
          // Sum the quantities if the ingredient already exists
          allIngredients[ingredient.ingredient_id].quantity +=
            ingredient.quantity;
        } else {
          // Add the ingredient with the purchased flag
          allIngredients[ingredient.ingredient_id] = {
            ...ingredient,
            purchased: false,
          };
        }
      });
    });

    return Object.values(allIngredients); // Convert the object back to an array
  };

  const createPlan = async () => {
    console.log("Plans before serialization: ", plans);

    try {
      const adjustedPlans = await Promise.all(
        plans.map(async (plan) => {
          // Assign a random recipe ID to each meal
          const afternoonMealRecipeId =
            recipeIds[Math.floor(Math.random() * recipeIds.length)];
          const eveningMealRecipeId =
            recipeIds[Math.floor(Math.random() * recipeIds.length)];

          // Fetch recipe details for afternoon and evening meals
          const afternoonRecipeDetails = await fetchRecipeDetails(
            afternoonMealRecipeId
          );
          const eveningRecipeDetails = await fetchRecipeDetails(
            eveningMealRecipeId
          );

          // Debug logs
          // console.log("Afternoon recipe details:", afternoonRecipeDetails);
          // console.log("Evening recipe details:", eveningRecipeDetails);

          // Check if recipe details were successfully fetched
          if (!afternoonRecipeDetails || !eveningRecipeDetails) {
            console.error("Recipe details not found for one or more meals.");
            return null; // Skip this iteration
          }

          // Adjust quantities based on the number of people for each meal
          const adjustIngredients = (ingredients, peopleCount) =>
            ingredients.map((ingredient) => ({
              ...ingredient,
              quantity: ingredient.quantity * peopleCount, // Adjusting quantity
            }));

          const adjustedAfternoonMealIngredients = adjustIngredients(
            afternoonRecipeDetails.ingredients,
            plan.afternoonMeal.people.length
          );
          const adjustedEveningMealIngredients = adjustIngredients(
            eveningRecipeDetails.ingredients,
            plan.eveningMeal.people.length
          );

          // Return a new plan object with adjusted ingredients
          return {
            date: plan.date.toISOString().split("T")[0],
            afternoonMeal: {
              people: plan.afternoonMeal.people,
              recipeId: afternoonMealRecipeId,
              adjustedIngredients: adjustedAfternoonMealIngredients,
            },
            eveningMeal: {
              people: plan.eveningMeal.people,
              recipeId: eveningMealRecipeId,
              adjustedIngredients: adjustedEveningMealIngredients,
            },
          };
        })
      );

      // Filter out null entries (if any)
      const validAdjustedPlans = adjustedPlans.filter((plan) => plan !== null);

      if (validAdjustedPlans.length === 0) {
        console.error("No valid plans were created.");
        return; // Exit the function
      }

      // Aggregate ingredients to create the grocery list
      const groceryList = aggregateIngredients(validAdjustedPlans);

      const planningData = { dates: validAdjustedPlans, groceryList };
      console.log("Creating Planning Data:", planningData);

      // Save the new planning data with adjusted ingredient quantities
      const docRef = await createPlanning(planningData);
      console.log("Planning created with ID:", docRef.id);

      // Navigate to the Plan Info screen with the new planning ID
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
