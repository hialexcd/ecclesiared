import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import { NavigationContainer } from '@react-navigation/native';
import EcSacerdotes from './EcSacerdotes';
import ECSacerdotesAdd from './ECSacerdotesAdd';

const Stack = createStackNavigator();

const ECStack = () => {
  return (
 <Stack.Navigator>
    <Stack.Screen name="ECSacerdotes" component={EcSacerdotes} options={{ headerShown: false }} />
    <Stack.Screen name="ECSacerdotesAdd" component={ECSacerdotesAdd} options={{ headerShown: false }}/>
 </Stack.Navigator>
  );
};

export default ECStack;