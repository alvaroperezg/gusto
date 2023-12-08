import React from 'react';
import { View, Button } from 'react-native';

const PlansScreen = ({ navigation }) => {
  return (
    <View>
      {/* Otros componentes */}
      <Button
        title="Iniciar Sesión"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default PlansScreen;
