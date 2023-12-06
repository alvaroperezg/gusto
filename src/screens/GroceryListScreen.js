import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {fetchGroceryList, togglePurchased} from "../utils/groceryListFunctions.js";

const PlanGroceryList = ({ route, navigation }) => {
  const { planningId } = route.params;
  const [groceryList, setGroceryList] = useState([]);

console.log(planningId)

  useEffect(() => {
    fetchGroceryList(setGroceryList, planningId);
  }, [planningId]);

  // const togglePurchased = async (ingredientId) => {
  //   const newList = groceryList.map((item) =>
  //     item.ingredient_id === ingredientId
  //       ? { ...item, purchased: !item.purchased }
  //       : item
  //   );

  //   // Sort the list so that unpurchased items are at the top
  //   newList.sort((a, b) => {
  //     if (a.purchased === b.purchased) {
  //       return 0; // No change in order if both have the same purchased state
  //     }
  //     return a.purchased ? 1 : -1; // Unpurchased items come first
  //   });

  //   setGroceryList(newList);

  //   // Update Firestore document
  //   try {
  //     const docRef = doc(db, "plannings", planningId);
  //     await updateDoc(docRef, { groceryList: newList });
  //   } catch (error) {
  //     console.error("Error updating grocery list: ", error);
  //   }
  // };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.ingredientCard, item.purchased && styles.purchased]}
      onPress={() => togglePurchased(item.ingredient_id, groceryList, setGroceryList, planningId)}
    >
      <View style={styles.ingredientInfo}>
        <Text style={styles.ingredientName}>{item.name}</Text>
        <Text style={styles.ingredientQuantity}>{item.quantity} grams</Text>
      </View>
      <MaterialCommunityIcons
        name={
          item.purchased ? "checkbox-marked-outline" : "checkbox-blank-outline"
        }
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={groceryList}
      renderItem={renderItem}
      keyExtractor={(item) => item.ingredient_id}
    />
  );
};

const styles = StyleSheet.create({
  ingredientCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
    opacity: 1.0,
  },
  purchased: {
    opacity: 0.4,
  },
  ingredientInfo: {
    // styles for ingredient info container
  },
  ingredientName: {
    fontWeight: "600",
  },
  ingredientQuantity: {
    color: "gray",
  },
  // ...other styles...
});

export default PlanGroceryList;
