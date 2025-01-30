import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PagerView } from 'react-native-pager-view';

import EcCalendar from '../../components/EcAgenda';

const Tab = createMaterialTopTabNavigator();

const ConfigurationScreen = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        pager={props => <PagerView {...props} />}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 8 },
          tabBarStyle: { backgroundColor: '#1AB394' },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
          tabBarIndicatorStyle: { backgroundColor: 'white' },
        }}
      >
        <Tab.Screen 
          name="EcCalendar" 
          component={EcCalendar}
          options={{ tabBarLabel: 'Agenda Interior' }}
        />
          {/* 
          <Tab.Screen 
            name="EcSacerdotes" 
            component={ECStack}
            options={{ tabBarLabel: 'Gestionar Sacerdotes' }}
          />
          <Tab.Screen 
            name="EcParoquia" 
            component={ECParoquia}
            options={{ tabBarLabel: 'Datos de la Parroquia' }}
          />
          */}
      </Tab.Navigator>

        </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F3F4'
    }
  });

export default ConfigurationScreen