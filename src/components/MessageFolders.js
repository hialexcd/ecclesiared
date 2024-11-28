import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const MessageFolders = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CARPETAS</Text>
      <TouchableOpacity style={styles.folderItem}>
        <Ionicons name="mail" size={24} color="#2196F3" />
        <Text style={styles.folderText}>Recibidos</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>0</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.folderItem}>
        <Ionicons name="send" size={24} color="#2196F3" />
        <Text style={styles.folderText}>Enviados</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#757575',
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  folderText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#2196F3',
  },
  badge: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default MessageFolders;