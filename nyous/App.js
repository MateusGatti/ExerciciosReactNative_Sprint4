import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

//Storage
import AsyncStorage from '@react-native-async-storage/async-storage';


// Navigations
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Paginas
import Login from './pages/login'
import Home from './pages/home'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const Logout = ({ navigation }) => {
  return(
    <View>
      <Text>Deseja realmente sair?</Text>
      <Button title="Sair" onPress={() => {
        AsyncStorage.removeItem('@jwt');
        navigation.push('Login');
      }} />
    </View>
  )
}


const Autenticado = () => {
  return(

      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>

  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Autenticado" component={Autenticado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
