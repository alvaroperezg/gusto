import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MealCard = ({ category, title, duration, peopleCount, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.mealContainer}>
    <View>
      <Text style={styles.mealCategory}>{category}</Text>
      <Text style={styles.mealTitle}>{title}</Text>
      <Text style={styles.mealDuration}>{duration} min</Text>
      <Text style={styles.mealPeople}>{peopleCount} personas</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mealContainer: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealCategory: {
    fontWeight: "bold",
    color: "gray",
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  mealDuration: {
    color: "gray",
  },
  mealPeople: {
    color: "gray",
  },
});

export default MealCard;
