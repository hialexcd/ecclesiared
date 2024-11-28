import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const ECDocumentPicker = () => {
  const [attachments, setAttachments] = useState([null, null, null]);

  const pickDocument = async (index) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // all files
        copyToCacheDirectory: false,
      });

      if (result.type === 'success') {
        const newAttachments = [...attachments];
        newAttachments[index] = result;
        setAttachments(newAttachments);
      }
    } catch (err) {
      console.log('Document picking error:', err);
    }
  };

  const addMoreAttachments = () => {
    setAttachments([...attachments, null]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          Nota: Sólo están permitidos imágenes, documentos, Word, PDF o archivos de texto.
        </Text>
      </View>
      
      <Text style={styles.header}>Archivos adjuntos</Text>
      
      {attachments.map((attachment, index) => (
        <TouchableOpacity
          key={index}
          style={styles.fileButton}
          onPress={() => pickDocument(index)}
        >
          <Text style={styles.fileButtonText}>
            {attachment ? attachment.name : 'Choose File'}
          </Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.addMoreButton} onPress={addMoreAttachments}>
        <Text style={styles.addMoreButtonText}>Adjuntar más documentos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  noteContainer: {
    backgroundColor: '#e1f5fe',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteText: {
    color: '#0288d1',
    fontSize: 12,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fileButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  fileButtonText: {
    color: '#757575',
  },
  addMoreButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addMoreButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ECDocumentPicker;