import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importamos la función para obtener el detalle del mensaje
import { openWebPage} from '../services/api';  // Asegúrate de que la ruta sea correcta

const EcCustom = ({ navigation }) => {

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    navigation.navigate('LoginScreen'); // Ajusta esto según tus rutas
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileSection}>
          <View>
            <Text style={styles.profileName}>Jorge</Text>
            <Text style={styles.profileSubtext}>Mis datos</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Home')}>
          <Ionicons name="grid-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Panel de Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Configuration')}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Home')}>
          <Ionicons name="calendar-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Agenda Interior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Communication')}>
          <Ionicons name="mail-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Comunicación</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Botones alineados al fondo */}
      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.menuItem} onPress={openWebPage}>
          <Ionicons name="globe-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Ir a la versión web</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileSubtext: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
  footerButtons: {
    borderTopWidth: 1,
    borderTopColor: '#34495e',
    paddingVertical: 10,
  },
});

export default EcCustom;
