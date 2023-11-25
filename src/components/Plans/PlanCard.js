import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import TouchableImage from "./TouchableImage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const PlanCard = ({ plan, onPlanChange }) => {
  const [date, setDate] = useState(plan.date);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios"); // for iOS, we need to control the visibility
    setDate(currentDate); // Update the local state
    onPlanChange({ ...plan, date: currentDate }); // Update the parent state
  };

  const showDatePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      mode: "date",
      is24Hour: true,
    });
  };

  const showDatePickerIOS = () => {
    setShowDatePicker(true);
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

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.datePickerContainer}>
        {Platform.OS === "android" ? (
          <TouchableOpacity
            style={styles.button}
            onPress={showDatePickerAndroid}
          >
            {/* Display the formatted date on the button */}
            <Text style={styles.buttonText}>{formatDate(date)}</Text>
          </TouchableOpacity>
        ) : (
          <DateTimePicker
            value={date}
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
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default PlanCard;
