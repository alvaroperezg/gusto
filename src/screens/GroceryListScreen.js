import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firestore/config";

const PlanGroceryList = ({ route, navigation }) => {
  const { planningId } = route.params;
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    const fetchGroceryList = async () => {
      try {
        const docRef = doc(db, "plannings", planningId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGroceryList(docSnap.data().groceryList || []);
        } else {
          console.log("No such planning!");
        }
      } catch (error) {
        console.error("Error fetching grocery list: ", error);
      }
    };

    fetchGroceryList();
  }, [planningId]);

  const togglePurchased = async (ingredientId) => {
    // Function to toggle the 'purchased' state of an ingredient
    const newList = groceryList.map((item) =>
      item.ingredient_id === ingredientId
        ? { ...item, purchased: !item.purchased }
        : item
    );

    setGroceryList(newList);

    // Update Firestore document
    try {
      const docRef = doc(db, "plannings", planningId);
      await updateDoc(docRef, { groceryList: newList });
    } catch (error) {
      console.error("Error updating grocery list: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.ingredientCard, item.purchased && styles.purchased]}
      onPress={() => togglePurchased(item.ingredient_id)}
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
