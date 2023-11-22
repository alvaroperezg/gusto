import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

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
                <Image
                  source={require("../../assets/ppl/javi.jpg")}
                  style={styles.circleImage}
                />
                <Image
                  source={require("../../assets/ppl/diego.jpg")}
                  style={styles.circleImage}
                />
                <Image
                  source={require("../../assets/ppl/alvaro.jpg")}
                  style={styles.circleImage}
                />
              </View>
            </View>

            {/* Horizontal Row 2 */}
            <View style={styles.row}>
              <Text style={styles.rowText}>Cena</Text>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../assets/ppl/javi.jpg")}
                  style={styles.circleImage}
                />
                <Image
                  source={require("../../assets/ppl/diego.jpg")}
                  style={styles.circleImage}
                />
                <Image
                  source={require("../../assets/ppl/alvaro.jpg")}
                  style={styles.circleImage}
                />
              </View>
            </View>
          </View>
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
});

export default NewPlanScreen;
