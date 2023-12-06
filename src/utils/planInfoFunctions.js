import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firestore/config.js';

export async function fetchPlanning (planningId, setPlanning, setRecipes){
    try {
      const docRef = doc(db, "plannings", planningId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const planningData = docSnap.data();
        planningData.dates = planningData.dates.map((dateObj) => ({
          ...dateObj,
          date: new Date(dateObj.date),
        }));
        setPlanning(planningData);

        const uniqueRecipeIds = [
          ...new Set(
            planningData.dates.flatMap((dateObj) => [
              dateObj.afternoonMeal.recipeId,
              dateObj.eveningMeal.recipeId,
            ])
          ),
        ];
        const recipeDetails = {};
        for (const recipeId of uniqueRecipeIds) {
          if (!recipeDetails[recipeId]) {
            // Check if not already fetched
            const recipeDoc = await getDoc(doc(db, "recipes", recipeId));
            if (recipeDoc.exists()) {
              recipeDetails[recipeId] = recipeDoc.data();
            } else {
              console.log(`No such recipe with ID: ${recipeId}`);
            }
          }
        }
        setRecipes(recipeDetails);
      } else {
        console.log("No such planning!");
      }
    } catch (error) {
      console.error("Error fetching planning: ", error);
    }
  };