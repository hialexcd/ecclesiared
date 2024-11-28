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
            <Ionicons name="download-outline" size={24} color="#26A69A" />
          </TouchableOpacity>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Documentos</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Ver o añadir nuevo documento</Text>
          </TouchableOpacity>
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

    //Original

    import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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

  const renderDocumentItem = (doc) => {
    if (doc.type === 'header') {
      return (
        <View key={doc.id} style={styles.headerItem}>
          <Text style={styles.headerText}>{doc.name}</Text>
        </View>
      );
    }
    return (
      <View key={doc.id} style={styles.documentItem}>
        <Text style={styles.documentName}>{doc.name}</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="download-outline" size={24} color="#26A69A" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Documentos</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Ver o añadir nuevo documento</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Documento</Text>
        <Text style={styles.listHeaderText}>Descargar</Text>
      </View>
      <ScrollView style={styles.documentList}>
        {documents.map(renderDocumentItem)}
      </ScrollView>
      <TouchableOpacity style={styles.nextButton}>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
