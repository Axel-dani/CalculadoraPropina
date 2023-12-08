import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import About from './About';
import UserPreferences from './UserPreferences';

const Stack = createStackNavigator();

export default function AboutScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="About" component={About} options={{ title: 'Acerca de' }} />
      <Stack.Screen name="UserPreferences" component={UserPreferences} options={{ title: 'Preferencias' }} />
    </Stack.Navigator>
  );
}
