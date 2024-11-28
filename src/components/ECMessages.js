import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ECMessages = ({ route }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const { messageId } = route.params;

  useEffect(() => {
    // Simulate fetching message data
    setTimeout(() => {
      setMessage({
        subject: route.params?.subject || "Nuevo sistema de firma electrónica",
        from: "Soporte Ecclesiared (Soporte Técnico)",
        date: "06/02/2024 a las 9:27h",
        body: `Buenos días,

            Nos ponemos con usted para informarle que a partir de ahora, todos los documentos generados con Ecclesiared, contarán con una firma electrónica para garantizar y proteger la autenticidad de las partidas generadas por el sistema.

            De este modo, cualquier feligrés que obtenga un documento de la parroquia podrá ver un código alfanumérico único en la parte inferior del mismo. Este código será la firma digital que garantizará la originalidad y autenticidad del documento para evitar de este modo cualquier opción de falsificación de documentos.

            Gracias a este código, los feligreses que lo deseen, podrán comprobar la autenticidad de sus documentos siempre que quieran introduciendo dicho código en la web habilitada por Ecclesiared https://www.ecclesiared.es/verificador-de-documentos/.

            Ecclesiared se complace en ofrecer esta mejora a sus usuarios, fortaleciendo su compromiso de brindar soluciones digitales eficientes para la comunidad eclesiástica. Con este sistema de firma electrónica, Ecclesiared reafirma la seguridad de los procesos eclesiásticos en miles de parroquias y más de un centenar de Diócesis de 25 países en el mundo que utilizan la herramienta diariamente.

            Un saludo,
            Soporte técnico Ecclesiared`,
        replies: [
            {
                from: "Parroquia Santa María",
                date: "06/02/2024 a las 14:15h",
                body: "Muchas gracias por la información. ¿Podría proporcionarnos más detalles sobre cómo funcionará este sistema en la práctica diaria?"
              },
              {
                from: "Soporte Ecclesiared (Soporte Técnico)",
                date: "07/02/2024 a las 9:03h",
                body: "Con gusto. El sistema de firma electrónica se aplicará automáticamente a todos los documentos generados. No necesitará realizar ninguna acción adicional. Simplemente continúe utilizando Ecclesiared como lo ha hecho hasta ahora, y el código de verificación se añadirá automáticamente a cada documento."
              },
              {
                from: "Parroquia Santa María",
                date: "07/02/2024 a las 11:30h",
                body: "Entendido. Gracias por la rápida respuesta. Estamos ansiosos por ver esta nueva función en acción."
              }
        ]
      });
      setLoading(false);
    }, 1000); // Simulate network delay
  }, []);

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
          <View key={index} style={[
            styles.replyContainer, 
            reply.from.includes('Soporte Ecclesiared') ? styles.sentMessage : styles.receivedMessage
          ]}>
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