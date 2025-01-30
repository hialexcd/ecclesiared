import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const EcDocumentos = () => {
    const documents = [
        { id: 1, name: 'Documento añadido por su Diócesis: Delegación general', type: 'header' },
        { id: 2, name: 'Juramento de los Contrayentes' },
        { id: 3, name: 'Declaraciones y Promesas de los Contrayentes' },
        { id: 4, name: 'Delegación General de la Facultad para asistir al Matrimonio' },
        { id: 5, name: 'Declaraciones y Promesas de los contrayentes si uno es musulmán' },
        { id: 6, name: 'Declaraciones1 y Promesas de los contrayentes si uno es musulmán' }
    ];
  
    const renderDocumentItem = ({ item }) => {
      if (item.type === 'header') {
        return (
          <View style={styles.headerItem}>
            <Text style={styles.headerText}>{item.name}</Text>
          </View>
        );
      }
      return (
        <View style={styles.documentItem}>
          <Text style={styles.documentName}>{item.name}</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="download-outline" size={24} color="#1AB394" />
          </TouchableOpacity>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Documentos</Text>
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>Documento</Text>
          <Text style={styles.listHeaderText}>Descargar</Text>
        </View>
        <FlatList
          data={documents}
          renderItem={renderDocumentItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.documentList}
          nestedScrollEnabled={true}
        />
        <TouchableOpacity style={styles.nextButton}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    ); };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1AB394',
  },
  addButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listHeaderText: {
    fontWeight: 'bold',
    color: '#757575',
  },
  documentList: {
    maxHeight: 300,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  documentName: {
    flex: 1,
    fontSize: 14,
    color: '#2196F3',
  },
  downloadButton: {
    padding: 4,
  },
  nextButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#1AB394',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EcDocumentos;