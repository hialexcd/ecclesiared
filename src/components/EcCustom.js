import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EcCustom = ({ navigation }) => {

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        {/*<Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.profileImage}
        />*/}
        <View>
          <Text style={styles.profileName}>Fernando Varela</Text>
          <Text style={styles.profileSubtext}>Mis datos ▼</Text>
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
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="calendar-outline" size={24} color="#fff" />
        <Text style={styles.menuText}>Agenda Interior</Text>
      </TouchableOpacity>
      <View style={styles.submenuItem}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Communication')}>
          <Ionicons name="mail-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Comunicación</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="book-outline" size={24} color="#fff" />
        <Text style={styles.menuText}>L. Parroquiales</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="globe-outline" size={24} color="#fff" />
        <Text style={styles.menuText}>Página web</Text>
      </TouchableOpacity>
    </ScrollView>
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
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
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
  submenuItem: {
    backgroundColor: '#34495e',
  },
  submenuOption: {
    padding: 16,
    paddingLeft: 56,
  },
  submenuText: {
    color: '#bdc3c7',
    fontSize: 14,
  },
});

export default EcCustom;