import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MessageFolders from './MessageFolders';
import ECDocumentPicker from './ECDocumentPicker';

const ComposeMessageScreen = () => {
    const [recipient, setRecipient] = useState('');
    const [diocese, setDiocese] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
  
    // This is a sample list of dioceses. Replace with your actual list.
    const dioceses = [
      { label: 'Seleccione una diócesis', value: '' },
      { label: 'Bogotá', value: 'bogota' },
      { label: 'Medellín', value: 'medellin' },
      { label: 'Cali', value: 'cali' },
      // Add more dioceses as needed
    ];
  
    const handleSend = () => {
      // Implement send functionality here
      console.log('Sending message:', { recipient, diocese, subject, message });
    };
  
    return (
      <ScrollView style={styles.container}>
        <MessageFolders />
        <Text style={styles.header}>Redactar Mensaje</Text>
        
        <Text style={styles.label}>Para:</Text>
        <TextInput
          style={styles.input}
          value={recipient}
          onChangeText={setRecipient}
          placeholder="Destinatario"
        />
  
        <Text style={styles.label}>Seleccione una diócesis:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={diocese}
            onValueChange={(itemValue) => setDiocese(itemValue)}
            style={styles.picker}
          >
            {dioceses.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
  
        <Text style={styles.label}>Asunto:</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Asunto del mensaje"
        />
  
        <Text style={styles.label}>Mensaje:</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          value={message}
          onChangeText={setMessage}
          placeholder="Escriba su mensaje aquí"
          multiline
        />
  
        <ECDocumentPicker />
  
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar mensaje</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: 'white',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#26A69A',
    },
    label: {
      fontSize: 16,
      marginTop: 8,
      marginBottom: 4,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    messageInput: {
      height: 120,
      textAlignVertical: 'top',
    },
    pickerContainer: {
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      borderRadius: 5,
    },
    picker: {
      height: 40,
    },
    sendButton: {
      backgroundColor: '#26A69A',
      padding: 16,
      alignItems: 'center',
      borderRadius: 5,
    },
    sendButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });
  
  export default ComposeMessageScreen;

  