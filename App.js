import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import DrawerNavigation from './src/components/EcDrawer';
import { login, logout } from './src/services/api';
import registerNNPushToken from 'native-notify';

export default function App() {
  // Inicializar NativeNotify con el método correcto
  registerNNPushToken(26965, "GCkesmLDLEfVSJvboFYOiz");
    
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const result = await login(username, password); // Esperar la promesa de `login`
      if (result.success) {
        setLoggedIn(true); // Iniciar sesión si el login es exitoso
      } else {
        alert(result.error || 'Credenciales inválidas...'); // Mostrar error si falla
      }
    } catch (error) {
      console.error("Error en el proceso de inicio de sesión:", error);
      alert('Error inesperado. Por favor, inténtalo de nuevo.');
    }
  };

  const handleLogout = () => {
    logout();
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
