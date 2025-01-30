import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

const Header = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#1abc9c" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo_ecclesiared.png')}
            style={styles.logo}
          />
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Communication')}>
          <Ionicons name="mail-outline" size={24} color="#1abc9c" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F3F3F4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuButton: {
    padding: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
  },
});

export default Header;