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

  const handleLunchToggle = (name, isActive) => {
    let updatedPeople = [...plan.afternoonMeal.people];
    if (isActive) {
      if (!updatedPeople.includes(name)) {
        updatedPeople.push(name);
      }
    } else {
      updatedPeople = updatedPeople.filter((n) => n !== name);
    }
    console.log(
      `handleLunchToggle. Name: ${name}, IsActive: ${isActive}, Updated People: ${updatedPeople}`
    );
    onPlanChange({
      ...plan,
      afternoonMeal: { ...plan.afternoonMeal, people: updatedPeople },
    });
  };

  const handleDinnerToggle = (name, isActive) => {
    let updatedPeople = [...plan.eveningMeal.people];
    if (isActive) {
      if (!updatedPeople.includes(name)) {
        updatedPeople.push(name);
      }
    } else {
      updatedPeople = updatedPeople.filter((n) => n !== name);
    }
    console.log(
      `handleDinnerToggle. Name: ${name}, IsActive: ${isActive}, Updated People: ${updatedPeople}`
    );
    onPlanChange({
      ...plan,
      eveningMeal: { ...plan.eveningMeal, people: updatedPeople },
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isSingleDigitDate = (date) => {
    return date.getDate() < 10;
  };

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.datePickerContainer,
          isSingleDigitDate(date) ? { marginLeft: -21 } : { marginLeft: -12 },
        ]}
      >
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
            onToggle={(name, isActive) => handleLunchToggle("Javi", isActive)}
            name="Javi"
          />
          <TouchableImage
            source={require("../../../assets/ppl/diego.jpg")}
            onToggle={(name, isActive) => handleLunchToggle("Diego", isActive)}
            name="Diego"
          />
          <TouchableImage
            source={require("../../../assets/ppl/alvaro.jpg")}
            onToggle={(name, isActive) => handleLunchToggle("Alvaro", isActive)}
            name="Alvaro"
          />
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Cena</Text>
        <View style={styles.imageContainer}>
          <TouchableImage
            source={require("../../../assets/ppl/javi.jpg")}
            onToggle={(name, isActive) => handleDinnerToggle("Javi", isActive)}
            name="Javi"
          />
          <TouchableImage
            source={require("../../../assets/ppl/diego.jpg")}
            onToggle={(name, isActive) => handleDinnerToggle("Diego", isActive)}
            name="Diego"
          />
          <TouchableImage
            source={require("../../../assets/ppl/alvaro.jpg")}
            onToggle={(name, isActive) =>
              handleDinnerToggle("Alvaro", isActive)
            }
            name="Alvaro"
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
