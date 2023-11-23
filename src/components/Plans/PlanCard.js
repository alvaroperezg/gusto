import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TouchableImage from "./TouchableImage";

const PlanCard = ({ plan, onPlanChange }) => {
  const onChangeDate = (event, selectedDate) => {
    const updatedPlan = { ...plan, date: selectedDate || plan.date };
    onPlanChange(updatedPlan);
  };

  const handleLunchToggle = (isActive) => {
    const updatedLunchCount = isActive ? plan.lunch - 1 : plan.lunch + 1;
    const updatedPlan = { ...plan, lunch: updatedLunchCount };
    onPlanChange(updatedPlan);
  };

  const handleDinnerToggle = (isActive) => {
    const updatedDinnerCount = isActive ? plan.dinner - 1 : plan.dinner + 1;
    const updatedPlan = { ...plan, dinner: updatedDinnerCount };
    onPlanChange(updatedPlan);
  };

  return (
    <View style={styles.card}>
      <View style={styles.datePickerContainer}>
        {plan.date && (
          <DateTimePicker
            value={plan.date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Comida</Text>
        <View style={styles.imageContainer}>
          <TouchableImage
            source={require("../../../assets/ppl/javi.jpg")}
            onToggle={(isActive) => handleLunchToggle(!isActive)}
          />
          <TouchableImage
            source={require("../../../assets/ppl/diego.jpg")}
            onToggle={(isActive) => handleLunchToggle(!isActive)}
          />
          <TouchableImage
            source={require("../../../assets/ppl/alvaro.jpg")}
            onToggle={(isActive) => handleLunchToggle(!isActive)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Cena</Text>
        <View style={styles.imageContainer}>
          <TouchableImage
            source={require("../../../assets/ppl/javi.jpg")}
            onToggle={(isActive) => handleDinnerToggle(!isActive)}
          />
          <TouchableImage
            source={require("../../../assets/ppl/diego.jpg")}
            onToggle={(isActive) => handleDinnerToggle(!isActive)}
          />
          <TouchableImage
            source={require("../../../assets/ppl/alvaro.jpg")}
            onToggle={(isActive) => handleDinnerToggle(!isActive)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  datePickerContainer: {
    alignItems: "flex-start",
    marginLeft: -10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  rowText: {
    flex: 1,
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default PlanCard;
