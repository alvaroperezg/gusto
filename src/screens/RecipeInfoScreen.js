import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RecipeInfoScreen = ({ navigation }) => {
  const data = {
    title: "Burritos Maravilla",
    prepTime: "40 min",
    peopleCount: 3,
    ingredients: [
      { id: 1, text: "Fajitas integrales" },
      { id: 2, text: "Salsa nakama" },
      // ... more ingredients
    ],
    steps: [
      { id: 1, text: "Calienta las fajitas." },
      {
        id: 2,
        text: "Moja las fajitas en salsa nakama y a disfrutar de tu maravillosa comida.",
      },
      // ... more steps
    ],
  };

  const [activeTab, setActiveTab] = useState("ingredients"); // State to manage active tab
  const [completedSteps, setCompletedSteps] = useState({});

  return (
    <SafeAreaView>
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.subtitleContainer}>
          <Ionicons name="time-outline" size={18} color="gray" />
          <Text style={styles.iconText}> {data.prepTime}</Text>
          <Ionicons
            name="person-outline"
            size={18}
            color="gray"
            style={styles.iconSpacing}
          />
          <Text style={styles.iconText}> {data.peopleCount} personas</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "ingredients" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("ingredients")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "ingredients" && styles.activeTabText,
              ]}
            >
              Ingredientes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "steps" && styles.activeTab]}
            onPress={() => setActiveTab("steps")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "steps" && styles.activeTabText,
              ]}
            >
              Pasos
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContent}>
          {activeTab === "ingredients"
            ? data.ingredients.map((ingredient) => (
                <View key={ingredient.id} style={styles.itemContainer}>
                  <Text style={styles.itemText}>{ingredient.text}</Text>
                </View>
              ))
            : data.steps.map((step) => (
                <TouchableOpacity
                  key={step.id}
                  style={[
                    styles.stepContainer,
                    completedSteps[step.id] ? { opacity: 0.4 } : null,
                  ]}
                  onPress={() => {
                    setCompletedSteps({
                      ...completedSteps,
                      [step.id]: !completedSteps[step.id],
                    });
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View style={styles.stepNumberCircle}>
                      <Text style={styles.stepNumberText}>{step.id}</Text>
                    </View>
                    <Text style={styles.stepText}>{step.text}</Text>
                  </View>
                  <Ionicons
                    name={
                      completedSteps[step.id] ? "checkbox" : "square-outline"
                    }
                    size={24}
                    color="black"
                    style={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecipeInfoScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  iconText: {
    color: "gray",
    marginLeft: 0,
  },
  iconSpacing: {
    marginLeft: 16,
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: "green",
  },
  tabText: {
    fontWeight: "500",
    color: "black",
  },
  activeTabText: {
    color: "white",
  },
  tabContent: {
    marginTop: 16,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    color: "black",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumberCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 8,
  },
  stepNumberText: {
    color: "white",
    fontWeight: "bold",
  },
  stepText: {
    color: "black",
    paddingRight: 16,
  },
});
