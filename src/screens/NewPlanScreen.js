import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import TouchableImage from "../components/Plans/TouchableImage";
import { Ionicons } from "@expo/vector-icons";

const NewPlanScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.content}>
          {/* Card */}
          <View style={styles.card}>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            </View>

            {/* Horizontal Row 1 */}
            <View style={styles.row}>
              <Text style={styles.rowText}>Comida</Text>
              <View style={styles.imageContainer}>
                <TouchableImage source={require("../../assets/ppl/javi.jpg")} />
                <TouchableImage
                  source={require("../../assets/ppl/diego.jpg")}
                />
                <TouchableImage
                  source={require("../../assets/ppl/alvaro.jpg")}
                />
              </View>
            </View>

            {/* Horizontal Row 2 */}
            <View style={styles.row}>
              <Text style={styles.rowText}>Cena</Text>
              <View style={styles.imageContainer}>
                <TouchableImage source={require("../../assets/ppl/javi.jpg")} />
                <TouchableImage
                  source={require("../../assets/ppl/diego.jpg")}
                />
                <TouchableImage
                  source={require("../../assets/ppl/alvaro.jpg")}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              // Handle the button press here
              console.log("Add Date button pressed");
            }}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
    flex: 1,
    padding: 20,
  },
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
  circleImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 10,
    overflow: "hidden",
  },
  addButton: {
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 9999,
    alignItems: "center",
  },
});

export default NewPlanScreen;
