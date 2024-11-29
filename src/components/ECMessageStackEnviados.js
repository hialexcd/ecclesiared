import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import { NavigationContainer } from '@react-navigation/native';
import ECEnviados from './ECEnviados';
import ECMessages from './ECMessages';

const MessageStack = createStackNavigator();

const ECMessageStack = () => {
  return (
 <MessageStack.Navigator>
    <MessageStack.Screen name="ECEnviados" component={ECEnviados} options={{ headerShown: false }} />
    <MessageStack.Screen name="ECMessages" component={ECMessages} 
        options={({ route }) => ({ 
            title: route.params?.subject || 'Detalles del mensaje',
            headerTitleStyle: {
              fontSize: 18,
            },
          })} />
 </MessageStack.Navigator>
  );
};

export default ECMessageStack;