import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MealCard from "../components/Plans/MealCard";

const PlanInfoScreen = ({ navigation }) => {
  const data = {
    startDate: new Date(2023, 10, 25),
    endDate: new Date(2023, 10, 30),
    purchasedGroceries: 6,
    allGroceries: 20,
    mealPlans: [
      {
        date: new Date(2023, 10, 25),
        meals: {
          lunch: {
            title: "Grilled Chicken Salad",
            duration: 30,
            peopleCount: 2,
          },
          dinner: {
            title: "Pasta with Tomato Sauce",
            duration: 45,
            peopleCount: 3,
          },
        },
      },
      {
        date: new Date(2023, 10, 26),
        meals: {
          lunch: {
            title: "Vegetable Stir Fry",
            duration: 25,
            peopleCount: 1,
          },
          dinner: {
            title: "Beef Tacos",
            duration: 50,
            peopleCount: 4,
          },
        },
      },
      {
        date: new Date(2023, 10, 27),
        meals: {
          lunch: {
            title: "Caesar Salad",
            duration: 20,
            peopleCount: 2,
          },
          dinner: {
            title: "Salmon with Asparagus",
            duration: 35,
            peopleCount: 2,
          },
        },
      },
      {
        date: new Date(2023, 10, 28),
        meals: {
          lunch: {
            title: "Avocado Toast",
            duration: 15,
            peopleCount: 1,
          },
          dinner: {
            title: "Chicken Curry",
            duration: 40,
            peopleCount: 3,
          },
        },
      },
      // ... continue adding additional meal plans as needed
    ],

    // ... other mock data fields
  };

  const [activeDate, setActiveDate] = useState(data.startDate);

  useEffect(() => {
    // Set the active date to today's date if it falls within the range
    const today = new Date();
    if (today >= data.startDate && today <= data.endDate) {
      setActiveDate(today);
    }
  }, []);

  // Function to format the date as a string
  const formatDate = (date) => {
    const options = { day: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);
  };

  // Function to generate an array of dates between the start and end date
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Generate the array of dates for the calendar row
  const calendarDates = getDatesInRange(data.startDate, data.endDate);

  // Function to handle date selection
  const handleDateSelection = (selectedDate) => {
    setActiveDate(selectedDate);
  };

  return (
    <SafeAreaView>
      <View style={styles.content}>
        <Text style={styles.title}>Tu plan de comidas</Text>
        <Text style={styles.dates}>
          {formatDate(data.startDate)} → {formatDate(data.endDate)}
        </Text>
        <TouchableOpacity style={styles.groceriesListContainer}>
          <Text>Lista de la compra</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>
              {data.purchasedGroceries}/{data.allGroceries}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="gray"
              style={{ marginLeft: 4 }}
            />
          </View>
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.calendarContentContainer}
          style={styles.calendarRow}
        >
          {calendarDates.map((date, index) => {
            const isActive = date.toDateString() === activeDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                style={styles.dateContainer}
                onPress={() => handleDateSelection(date)}
              >
                <Text style={styles.dayLetter}>
                  {date.toLocaleDateString("es-ES", { weekday: "short" })[0]}
                </Text>
                <View
                  style={[
                    styles.dateCircle,
                    isActive && styles.activeDateCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateNumber,
                      isActive && styles.activeDateText,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Display meals for the active date */}
        {data.mealPlans
          .filter(
            (plan) => plan.date.toDateString() === activeDate.toDateString()
          )
          .map((plan, index) => (
            <View key={index}>
              <MealCard
                category="Comida"
                title={plan.meals.lunch.title}
                duration={plan.meals.lunch.duration}
                peopleCount={plan.meals.lunch.peopleCount}
                onPress={() => console.log("Lunch Pressed")}
              />
              <MealCard
                category="Cena"
                title={plan.meals.dinner.title}
                duration={plan.meals.dinner.duration}
                peopleCount={plan.meals.dinner.peopleCount}
                onPress={() => console.log("Dinner Pressed")}
              />
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  dates: {
    marginTop: 8,
    color: "gray",
  },
  groceriesListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow property
    elevation: 3,
  },
  calendarRow: {
    marginVertical: 20,
  },
  calendarContentContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  dateContainer: {
    alignItems: "center",
    marginRight: 24,
  },
  dayLetter: {
    color: "black",
    fontWeight: "500",
  },
  dateCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  activeDateCircle: {
    backgroundColor: "green",
  },
  dateNumber: {
    color: "black",
  },
  activeDateText: {
    color: "white",
  },
  recipesText: {
    fontWeight: "400",
    marginTop: 24,
    color: "black",
  },
});

export default PlanInfoScreen;
