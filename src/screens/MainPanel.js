import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import EcChart from '../components/EcChart';
import EcDocumentos from '../components/EcDocumentos';
import EcAgenda from '../components/EcAgenda';
import EcActualidad from '../components/EcAtualidad';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import { NavigationContainer } from '@react-navigation/native';
import { PagerView } from 'react-native-pager-view';

const Tab = createMaterialTopTabNavigator();

export default function MainPanel() {
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
          name="Estadísticas" 
          component={EcChart}
          options={{ tabBarLabel: 'Estadísticas' }}
        />
        <Tab.Screen 
          name="Documentos" 
          component={EcDocumentos}
          options={{ tabBarLabel: 'Documentos' }}
        />
        <Tab.Screen 
          name="Agenda" 
          component={EcAgenda}
          options={{ tabBarLabel: 'Agenda' }}
        />
        <Tab.Screen 
          name="Actualidad" 
          component={EcActualidad}
          options={{ tabBarLabel: 'Actualidad' }}
        />
      </Tab.Navigator>

        </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F3F4'
    },
    eccImage:{
        flex: 0.2,
        justifyContent:'center',
        alignItems:'center',
    },
    ecComun:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
    ,placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
  });