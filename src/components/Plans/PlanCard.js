import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TouchableImage from "./TouchableImage";

const PlanCard = ({ initialDate, onDateChange }) => {
  const [date, setDate] = useState(initialDate || new Date());
  const [lunchCount, setLunchCount] = useState(3);
  const [dinnerCount, setDinnerCount] = useState(3);

  useEffect(() => {
    // Ensures the parent component is notified of the initial date
    if (onDateChange) {
      onDateChange(date);
    }
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (onDateChange) {
      onDateChange(currentDate);
    }
  };

  const handleLunchToggle = (isActive) => {
    setLunchCount((prevCount) => (isActive ? prevCount + 1 : prevCount - 1));
  };

  const handleDinnerToggle = (isActive) => {
    setDinnerCount((prevCount) => (isActive ? prevCount + 1 : prevCount - 1));
  };

  return (
    <View style={styles.card}>
      <View style={styles.datePickerContainer}>
        {/* check to make sure there's a date in state */}
        {date && (
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
            onToggle={handleLunchToggle}
          />
          <TouchableImage
            source={require("../../../assets/ppl/diego.jpg")}
            onToggle={handleLunchToggle}
          />
          <TouchableImage
            source={require("../../../assets/ppl/alvaro.jpg")}
            onToggle={handleLunchToggle}
          />
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Cena</Text>
        <View style={styles.imageContainer}>
          <TouchableImage
            source={require("../../../assets/ppl/javi.jpg")}
            onToggle={handleDinnerToggle}
          />
          <TouchableImage
            source={require("../../../assets/ppl/diego.jpg")}
            onToggle={handleDinnerToggle}
          />
          <TouchableImage
            source={require("../../../assets/ppl/alvaro.jpg")}
            onToggle={handleDinnerToggle}
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
