import {useState, useEffect, React} from "react";
import { View, Text } from "react-native";
import {getPlanningManin} from "../../firestore/funciones.js";

const PlanInfoScreen = ({ route }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getPlanningManin().then(data => {
      setPlans(data);
    }).catch(error => {
      console.error('Error al obtener los planings:', error);
    });
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {plans.map((plan, index) => (
        <View key={index} style={{ marginVertical: 10 }}>
          <Text>{`Plan date: ${plan.date}`}</Text>
          <Text>{`Lunch count: ${plan.lunch}`}</Text>
          <Text>{`Dinner count: ${plan.dinner}`}</Text>
        </View>
      ))}
    </View>
  );
};

export default PlanInfoScreen;
