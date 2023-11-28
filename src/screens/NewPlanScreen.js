import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PlanCard from "../components/Plans/PlanCard";
import {setPlanningManin,buscaCampoCompa,getDatosRecetasParguelas} from "../../firestore/funciones.js";

const NewPlanScreen = ({ navigation }) => {
  const [plans, setPlans] = useState([
    { date: new Date(), lunch: 3, dinner: 3 , idComida: 3, idCena: 4},
  ]);

  const updatePlan = (index, updatedPlan) => {
    const newPlans = [...plans];
    newPlans[index] = updatedPlan;
    setPlans(newPlans);
  };

  const addPlanCard = () => {
    const lastPlanDate = plans[plans.length - 1].date;
    const newDate = new Date(lastPlanDate);
    newDate.setDate(newDate.getDate() + 1);
    setPlans([...plans, { date: newDate, lunch: 3, dinner: 3 }]);
  };

  const createPlan = () => {
    const serializablePlans = plans.map((plan) => ({
      ...plan,
      date: plan.date.toISOString().split('T')[0], // Convert date to ISO string

    }));

    // console.log("Serializable Plans:", serializablePlans);
    setPlanningManin(serializablePlans)

    navigation.replace("Plan Info", { plans: serializablePlans });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView style={styles.content}>
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              plan={plan}
              onPlanChange={(updatedPlan) => updatePlan(index, updatedPlan)}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addPlanCard}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.createPlanButton} onPress={createPlan}>
          <Text style={styles.createPlanButtonText}>Crear plan</Text>
        </TouchableOpacity>
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
  createPlanButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 9999,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  createPlanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NewPlanScreen;
