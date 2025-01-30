import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header';
import EcChart from '../../components/EcChart';
import EcDocumentos from '../../components/EcDocumentos';
import EcAgenda from '../../components/EcAgenda';
import EcActualidad from '../../components/EcAtualidad';
import ComposeMessageScreen from '../../components/ComposeMessageScreen';
import ECRecebidos from '../../components/ECRecebidos';
import ECMessages from '../../components/ECMessages';
import ECEnviados from '../../components/ECEnviados';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import { NavigationContainer } from '@react-navigation/native';
import { PagerView } from 'react-native-pager-view';
import ECMessageStack from '../../components/ECMessageStack';
import ECMessageStackEnviados from '../../components/ECMessageStackEnviados';

const Tab = createMaterialTopTabNavigator();

export default function CommunicationScreen() {
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
          name="Recebidos" 
          component={ECMessageStack}
          options={{ tabBarLabel: 'Recibidos' }}
        />
        <Tab.Screen 
          name="Enviados" 
          component={ECMessageStackEnviados}
          options={{ tabBarLabel: 'Enviados' }}
        />
        <Tab.Screen 
          name="Redatar" 
          component={ComposeMessageScreen}
          options={{ tabBarLabel: 'Redactar' }}
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

