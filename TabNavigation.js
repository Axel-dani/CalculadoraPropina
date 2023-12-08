import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ventana1 from './Ventanas/Ventana1';
import Ventana2 from './Ventanas/Ventana2';
import About from './Ventanas/About';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Ventana1" component={Ventana1} />
      <Tab.Screen name="Ventana2" component={Ventana2} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
}