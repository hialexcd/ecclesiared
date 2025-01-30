import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import DrawerNavigation from './src/components/EcDrawer';
import { login, logout, loadSession } from './src/services/api';
import registerNNPushToken from 'native-notify';

export default function App() {

    registerNNPushToken(26965, "GCkesmLDLEfVSJvboFYOiz");//usar native notify push
  
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await loadSession();
      if (session) {
        setLoggedIn(true);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const result = await login(username, password); // Esperar la promesa de `login`
      if (result.success) {
        setLoggedIn(true);
      } else {
        alert(result.error || 'Credenciales inválidas...');
      }
    } catch (error) {
      console.error("Error en el proceso de inicio de sesión:", error);
      alert('Error inesperado. Por favor, inténtalo de nuevo.');
    }
  };

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor="#1AB394" />
          <LoginScreen onLogin={handleLogin} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#1AB394" />
        <DrawerNavigation onLogout={handleLogout} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
