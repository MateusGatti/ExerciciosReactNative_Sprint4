import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Camera } from 'expo-camera';
import Foto from './pages/camera'




const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Foto" component={Foto} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

