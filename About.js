import React from 'react';
import { View, Text, Button } from 'react-native';

export default function About({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de propinas</Text>
      <Text style={styles.version}>Versión 0.1</Text>
      <Button
        title="Preferencias"
        onPress={() => navigation.navigate('UserPreferences')}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    marginBottom: 50,
  },
};
