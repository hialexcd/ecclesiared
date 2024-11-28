import { StatusBar } from 'expo-status-bar';
//import {  SafeAreaView } from 'react-native';
//import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CommunicationScreen from './src/screens/CommunicationScreens/CommunicationScreen';
import MainScrollableView from './src/screens/MainScrollableView';
import Header from './src/components/Header';
import DrawerNavigation from './src/components/EcDrawer';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
      <StatusBar backgroundColor="#26A69A" />
      <DrawerNavigation/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}