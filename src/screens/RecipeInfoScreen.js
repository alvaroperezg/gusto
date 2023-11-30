import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const RecipeInfoScreen = ({ navigation, route }) => {
  const { recipeId, peopleCount } = route.params;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "recipes", recipeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          console.log("Recipe not found");
        }
      } catch (error) {
        console.error("Error fetching recipe: ", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // Helper function to render ingredients
  const renderIngredients = () => {
    return recipe.ingredients.map((ingredient, index) => (
      <View key={index} style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {ingredient.name} - {ingredient.quantity}
        </Text>
      </View>
    ));
  };

  // Helper function to render preparation steps
  const renderSteps = () => {
    return recipe.steps.map((step, index) => (
      <View key={index} style={styles.stepContainer}>
        <Text style={styles.stepText}>
          {index + 1}. {step}
        </Text>
      </View>
    ));
  };

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{recipe.name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Tiempo de preparación: {recipe.prepTime} minutos
          </Text>
          <Text style={styles.infoText}>Para {peopleCount} personas</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          {renderIngredients()}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pasos</Text>
          {renderSteps()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeInfoScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "gray",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    color: "black",
    fontSize: 16,
  },
  stepContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepText: {
    color: "black",
    fontSize: 16,
  },
});
