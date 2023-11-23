import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PlanCard from "../components/Plans/PlanCard";

const NewPlanScreen = ({ navigation }) => {
  // State for storing the dates of PlanCards
  const [planCardDates, setPlanCardDates] = useState([new Date()]);

  const updateDate = (index, newDate) => {
    const updatedDates = [...planCardDates];
    updatedDates[index] = newDate;
    setPlanCardDates(updatedDates);
  };

  // Function to add a new card
  const addPlanCard = () => {
    const lastCardDate = planCardDates[planCardDates.length - 1];
    const newDate = new Date(lastCardDate);
    newDate.setDate(newDate.getDate() + 1);
    setPlanCardDates([...planCardDates, newDate]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView style={styles.content}>
          {planCardDates.map((date, index) => (
            <PlanCard
              key={index}
              initialDate={date}
              onDateChange={(newDate) => updateDate(index, newDate)}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addPlanCard}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </ScrollView>
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
});

export default NewPlanScreen;
