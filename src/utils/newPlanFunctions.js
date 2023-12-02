import { doc, docs, getDocs, collection, addDoc } from "firebase/firestore";
import { db } from '../../firestore/config.js';
import {createPlanning, fetchRecipeDetails} from "../../firestore/funciones.js";

export async function fetchRecipes(setRecipeIds){
  try {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const ids = querySnapshot.docs.map((doc) => doc.id);
    setRecipeIds(ids);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

export default function addPlanCard(plans,setPlans){
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

export async function updatePlan(index, updatedPlan, plans, setPlans){
    const newPlans = [...plans];
    newPlans[index] = updatedPlan;
    setPlans(newPlans);
    console.log(`updatePlan called. Index: ${index}, Updated Plan: `
    );
  };
   
export async function createPlan(recipeIds, setRecipeIds, plans){
  console.log("Plans before serialization: ", plans);
  console.log("--------------------------------------------------------------------------");

  try {
    const adjustedPlans = await Promise.all(
      plans.map(async (plan) => {
        let idRandom = Math.floor(Math.random() * recipeIds.length);
        const afternoonMealRecipeId = recipeIds[idRandom];
        setRecipeIds(recipeIds.splice(idRandom, 1))

        idRandom = Math.floor(Math.random() * recipeIds.length);
        const eveningMealRecipeId = recipeIds[idRandom];
        setRecipeIds(recipeIds.splice(idRandom, 1))
        

        const afternoonRecipeDetails = await fetchRecipeDetails( afternoonMealRecipeId );
        const eveningRecipeDetails = await fetchRecipeDetails( eveningMealRecipeId );

        if (!afternoonRecipeDetails || !eveningRecipeDetails) {
          console.error("Recipe details not found for one or more meals.");
          return null; // Skip this iteration
        }

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

    const validAdjustedPlans = adjustedPlans.filter((plan) => plan !== null);

    if (validAdjustedPlans.length === 0) {
      console.error("No valid plans were created.");
      return; 
    }
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

export async function aggregateIngredients(plans){
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
