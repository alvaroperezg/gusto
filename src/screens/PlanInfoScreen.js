import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MealCard from "../components/Plans/MealCard";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const PlanInfoScreen = ({ route, navigation }) => {
  const { planningId } = route.params;
  const [planning, setPlanning] = useState(null);
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    const db = getFirestore();
    const fetchPlanning = async () => {
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

    fetchPlanning();
  }, [planningId]);

  // Helper function to format date
  const formatDate = (date) =>
    date.toLocaleDateString("es-ES", { day: "numeric", month: "long" });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {planning?.dates.map((dateObj, index) => (
          <View key={index}>
            <Text style={styles.dateText}>{formatDate(dateObj.date)}</Text>
            <MealCard
              category="Comida"
              title={
                recipes[dateObj.afternoonMeal.recipeId]?.name || "Loading..."
              }
              duration={
                recipes[dateObj.afternoonMeal.recipeId]?.prepTime
                  ? `${recipes[dateObj.afternoonMeal.recipeId].prepTime} min`
                  : "Loading..."
              }
              peopleCount={dateObj.afternoonMeal.people.length.toString()}
              // onPress={() =>
              //   navigation.navigate("Receta", {
              //     recipeId: dateObj.afternoonMeal.recipeId,
              //     peopleCount: dateObj.afternoonMeal.people.length,
              //   })
              // }
              onPress={() =>
                navigation.navigate("Receta", {
                  recipeId: dateObj.afternoonMeal.recipeId,
                  peopleCount: dateObj.afternoonMeal.people.length,
                  dateObj: dateObj.afternoonMeal,
                })
              }
            />
            <MealCard
              category="Cena"
              title={
                recipes[dateObj.eveningMeal.recipeId]?.name || "Loading..."
              }
              duration={
                recipes[dateObj.eveningMeal.recipeId]?.prepTime
                  ? `${recipes[dateObj.eveningMeal.recipeId].prepTime} min`
                  : "Loading..."
              }
              peopleCount={dateObj.eveningMeal.people.length.toString()}
              // onPress={() =>
              //   navigation.navigate("Receta", {
              //     recipeId: dateObj.eveningMeal.recipeId,
              //     peopleCount: dateObj.eveningMeal.people.length,
              //   })
              // }
              onPress={() =>
                navigation.navigate("Receta", {
                  recipeId: dateObj.eveningMeal.recipeId,
                  peopleCount: dateObj.eveningMeal.people.length,
                  dateObj: dateObj.eveningMeal,
                })
              }
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Define your styles here
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    padding: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    // other styles for the date text
  },
  // add other styles as needed
});

export default PlanInfoScreen;
