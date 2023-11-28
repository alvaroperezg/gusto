import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const GroceryListScreen = ({ navigation }) => {
  // Mock data
  const [groceries, setGroceries] = useState([
    { id: "1", name: "Manzanas", quantity: "2 kg", purchased: false },
    { id: "2", name: "Pan integral", quantity: "500 g", purchased: false },
    { id: "3", name: "Leche de soja", quantity: "1 litro", purchased: false },
  ]);

  const togglePurchased = (id) => {
    const newGroceries = groceries.map((item) => {
      if (item.id === id) {
        return { ...item, purchased: !item.purchased };
      }
      return item;
    });
    setGroceries(newGroceries);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {groceries.map((item) => (
          <View
            key={item.id}
            style={[
              styles.itemContainer,
              item.purchased ? styles.itemPurchased : null,
            ]}
          >
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => togglePurchased(item.id)}
            >
              <MaterialCommunityIcons
                name={
                  item.purchased
                    ? "checkbox-marked-circle"
                    : "checkbox-blank-circle-outline"
                }
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default GroceryListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  itemPurchased: {
    opacity: 0.4,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: "gray",
  },
});
