import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MessageFolders from './MessageFolders';
import ECDocumentPicker from './ECDocumentPicker';

const ComposeMessageScreen = () => {
  const [recipient, setRecipient] = useState('');
  const [diocese, setDiocese] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // State for dropdown
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Seleccione una diócesis', value: null},
    {label: 'Bogotá', value: 'bogota'},
    {label: 'Medellín', value: 'medellin'},
    {label: 'Cali', value: 'cali'},
    // Add more dioceses as needed
  ]);

  const handleSend = () => {
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
      
      <View style={styles.pickerContainer}>
      <DropDownPicker
        open={open}
        value={diocese}
        items={items}
        setOpen={setOpen}
        setValue={setDiocese}
        setItems={setItems}
        placeholder="Seleccione una diócesis"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
      />
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
    borderRadius: 5,
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
    ...Platform.select({
      ios: {
        // iOS-specific styles
      },
      android: {
        // Android-specific styles
      },
    }),
  },
  picker: {
    height: 40,
    width: '100%',
    ...Platform.select({
      ios: {
        // iOS-specific styles
      },
      android: {
        color: 'black',
      },
    }),
  },
  pickerItem: {
    fontSize: 16,
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