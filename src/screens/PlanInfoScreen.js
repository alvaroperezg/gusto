import React from "react";
import { View, Text } from "react-native";

const PlanInfoScreen = ({ route }) => {
  // Extract and parse plans data from navigation params
  const plans =
    route.params?.plans.map((plan) => ({
      ...plan,
      date: new Date(plan.date), // Parse ISO string back to Date object
    })) || [];

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {plans.map((plan, index) => (
        <View key={index} style={{ marginVertical: 10 }}>
          <Text>{`Plan date: ${plan.date.toLocaleDateString()}`}</Text>
          <Text>{`Lunch count: ${plan.lunch}`}</Text>
          <Text>{`Dinner count: ${plan.dinner}`}</Text>
        </View>
      ))}
    </View>
  );
};

export default PlanInfoScreen;
