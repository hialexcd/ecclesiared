import { View, StyleSheet } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';
import { PagerView } from 'react-native-pager-view';
import EcChart from '../components/EcChart';
import EcDocumentos from '../components/EcDocumentos';
import EcAgenda from '../components/EcAgenda';
import EcActualidad from '../components/EcAtualidad';

const Tab = createMaterialTopTabNavigator();

export default function MainPanel() {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName={route.params?.screen || "Estadísticas"} // Si hay una pestaña enviada, la usa; si no, usa la predeterminada
        pager={(props) => <PagerView {...props} />}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 8 },
          tabBarStyle: { backgroundColor: '#1AB394' },
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
          name="Actualidad" 
          component={EcActualidad}
          options={{ tabBarLabel: 'Actualidad' }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F4',
  },
});
