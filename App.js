import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// pantallas a importar para navegación
import PlansScreen from "./src/screens/PlansScreen";
import NewPlanScreen from "./src/screens/NewPlanScreen";
import PlanInfoScreen from "./src/screens/PlanInfoScreen";

//CONFIGURACION FIRESTORE
import { db } from "./firestore/config.js";
import {dameDocBro,dameDocsChacho,setPlanningManin} from "./firestore/funciones.js";


export default function App() {
  // para navegación entre pantallas
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Plans">
        <Stack.Screen name="Planes" component={PlansScreen} />
        <Stack.Screen
          name="Nuevo plan"
          component={NewPlanScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Plan Info" component={PlanInfoScreen} />
        {/* otras pantallas van aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
