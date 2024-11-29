import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MessageFolders from './MessageFolders';
import ECDocumentPicker from './ECDocumentPicker';
import { enviarMensaje } from '../services/api';  // Importar la función enviarMensaje

const ComposeMessageScreen = () => {
  const [recipient, setRecipient] = useState('');
  const [diocese, setDiocese] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Estado para dropdown
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Seleccione una diócesis', value: null},
    {label: 'Bogotá', value: 'bogota'},
    {label: 'Medellín', value: 'medellin'},
    {label: 'Cali', value: 'cali'},
    // Agrega más diócesis según sea necesario
  ]);

  const handleSend = async () => {
    // Crea el objeto mensaje con los valores del formulario
    const mensaje = {
      recipient,
      diocese,
      subject,
      message,
    };

    console.log('Sending message:', mensaje);  // Log de los datos antes de enviarlos

    try {
      // Llamamos a la función enviarMensaje para enviar los datos a la API
      const response = await enviarMensaje(mensaje);
      console.log('Mensaje enviado con éxito:', response);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
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
