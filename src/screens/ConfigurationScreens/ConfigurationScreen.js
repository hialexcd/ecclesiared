import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PagerView } from 'react-native-pager-view';

import EcDatos from '../../components/EcDatos';
import EcSacerdotes from '../../components/EcSacerdotes';
import ECParoquia from '../../components/ECParoquia';
import ECStack from '../../components/ECStack';

const Tab = createMaterialTopTabNavigator();

const ConfigurationScreen = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        pager={props => <PagerView {...props} />}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 8 },
          tabBarStyle: { backgroundColor: '#26A69A' },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
          tabBarIndicatorStyle: { backgroundColor: 'white' },
        }}
      >
        <Tab.Screen 
          name="EcDatos" 
          component={EcDatos}
          options={{ tabBarLabel: 'Mis Datos' }}
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