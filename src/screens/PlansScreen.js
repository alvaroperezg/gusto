import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// component imports
import NewPlanButton from "../components/Plans/NewPlanButton";

const PlansScreen = ({ navigation }) => {
  const [plannings, setPlannings] = useState([]);

  const PlanningCard = ({ planning, onPress }) => {
    const startDate = planning.dates[0]?.date;
    const endDate = planning.dates[planning.dates.length - 1]?.date;

    const formattedStartDate = startDate
      ? new Date(startDate).toLocaleDateString("es-ES")
      : "";
    const formattedEndDate = endDate
      ? new Date(endDate).toLocaleDateString("es-ES")
      : "";

    return (
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Text>
          {formattedStartDate} - {formattedEndDate}
        </Text>
      </TouchableOpacity>
    );
  };

  // useEffect(() => {
  //   const fetchPlannings = async () => {
  //     const db = getFirestore();
  //     const querySnapshot = await getDocs(collection(db, "plannings"));
  //     const planningsData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setPlannings(planningsData);
  //   };

  //   fetchPlannings();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPlannings = async () => {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "plannings"));
        const planningsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlannings(planningsData);
      };

      fetchPlannings();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.content}>
          {plannings.map((planning) => (
            <PlanningCard
              key={planning.id}
              planning={planning}
              onPress={() =>
                navigation.navigate("Plan Info", { planningId: planning.id })
              }
            />
          ))}
        </View>
        <NewPlanButton onPress={() => navigation.navigate("Nuevo plan")} />
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
    marginVertical: 8,
    borderRadius: 10,
  },
});

export default PlansScreen;
