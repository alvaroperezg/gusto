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
import { getItems } from "../utils/commonFunctions.js";
import { useFocusEffect } from "@react-navigation/native";
import { fetchPlanning } from "../utils/planInfoFunctions.js";

const PlanInfoScreen = ({ route, navigation }) => {
  const { planningId } = route.params;
  const [planning, setPlanning] = useState(null);
  const [recipes, setRecipes] = useState({});
  const [itemList, setItemList] = useState({ purchased: 0, total: 0 });
  
  useEffect(() => {
    fetchPlanning(planningId, setPlanning, setRecipes);
  }, [planningId]);
  
  useEffect(() => {
    if (planning) {
      const newItems = getItems(planning);
      setItemList(newItems);
    }
  }, [planning]);
  const formatDate = (date) =>
    date.toLocaleDateString("es-ES", { day: "numeric", month: "long" });
    
  useFocusEffect(
    React.useCallback(() => {
      fetchPlanning(planningId, setPlanning, setRecipes)
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Lista de la compra", { planningId })
          }
          style={styles.groceryListButton}
        >
          <Text style={styles.groceryListButtonText}>
            Ver lista de la compra
          </Text>
            <Text style={styles.groceryListButtonText}>
            {itemList ? `${itemList.purchased}/${itemList.total}` : 'Loading...'}
            </Text>
        </TouchableOpacity>
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
  },
  groceryListButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  groceryListButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PlanInfoScreen;
