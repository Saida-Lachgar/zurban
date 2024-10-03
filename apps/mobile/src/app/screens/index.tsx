import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './main';
import ConnectScreen from './connect';
import ContactScreen from './connect';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      header: () => null,
    }}>
      <Stack.Screen name="main" component={MainScreen}/>
      <Stack.Screen name="connect" component={ConnectScreen}/>
      <Stack.Screen name="contact" component={ContactScreen}/>
    </Stack.Navigator>
  );
}

export default RootNavigator;
