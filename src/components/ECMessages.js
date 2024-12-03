import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importamos la función para obtener el detalle del mensaje
import { getDetalleMensaje } from '../services/api';  // Asegúrate de que la ruta sea correcta

const ECMessages = ({ route }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const { messageId } = route.params;  // Asegurándonos de obtener messageId desde los params

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await getDetalleMensaje(messageId);  // Usamos messageId para obtener el detalle del mensaje
        const messageData = response[0];  // Suponemos que la respuesta es un arreglo de objetos
        
        // Procesamos el mensaje y las respuestas
        const [messageBody, ...replies] = messageData.mensaje.split('----------------------------------------------------------');
          
        // Limpieza del HTML en el mensaje y respuestas
        const cleanHTML = (html) => {
          return html
            //.replace(/<\/?h[1-6]>/g, '**') // Reemplaza h1-h6 con **
            .replace(/<\/?p>/g, '\n') // Reemplaza <p> con saltos de línea
            .replace(/<br\s*\/?>/g, '\n') // Reemplaza <br> con saltos de línea
            .replace(/<[^>]+>/g, '') // Remueve cualquier otra etiqueta HTML
            .replace(/\n{2,}/g, '\n') // Remueve saltos de línea consecutivos
            .trimStart(); // Elimina saltos de línea al comienzo
        };

          
        // Asignamos el mensaje y las respuestas
        setMessage({
          subject: messageData.asunto || "Asunto no disponible",
          from: messageData.de || "Desconocido",
          date: messageData.fecha || "Fecha no disponible",
          body: cleanHTML(messageBody),
          replies: replies.map((reply) => ({ 
            from: messageData.de,  // Usamos el mismo "de" para las respuestas por ahora
            date: messageData.fecha,
            body: cleanHTML(reply.trim())
          }))
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching message:', error);
        setLoading(false);
      }
    };

    fetchMessage();  // Llamamos a la función para cargar el mensaje
  }, [messageId]);  // Agregamos messageId en las dependencias

  const handleSendReply = () => {
    console.log('Sending reply:', replyText);
    setReplyText('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#26A69A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        <View style={styles.header}>
          <Text style={styles.subject}>{message.subject}</Text>
          <Text style={styles.sender}>{message.from}</Text>
          <Text style={styles.date}>{message.date}</Text>
        </View>
        <View style={styles.messageBody}>
          <Text>{message.body}</Text>
        </View>
        {message.replies && message.replies.map((reply, index) => (
          <View key={index} style={[styles.replyContainer, reply.from.includes('Soporte Ecclesiared') ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.replyHeader}>{reply.from} - {reply.date}</Text>
            <Text>{reply.body}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.replyInputContainer}>
        <TextInput
          style={styles.replyInput}
          value={replyText}
          onChangeText={setReplyText}
          placeholder="Escribir una respuesta..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendReply}>
          <Ionicons name="send" size={24} color="#26A69A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sender: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  messageBody: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  replyContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#e0f2f1',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#e8eaf6',
    alignSelf: 'flex-start',
  },
  replyHeader: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 12,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  replyInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ECMessages;
