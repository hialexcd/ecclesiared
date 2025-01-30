import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getMensajesEnviados } from '../services/api';  // Asegúrate de tener la ruta correcta

const ECEnviados = () => {

  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Simulated data fetch - replace this with your actual API call
/*  const fetchMessages = (pageNumber) => {
    setLoading(true);
    // Simulating an API call
    setTimeout(() => {
      const newMessages = [
        { id: `${pageNumber}1`, from: 'Soporte Técnico (Ecclesiared)', subject: `Tu opinión nos importa ${pageNumber}`, date: '06 Febrero 2024 - 5:27', isReply: true },
        { id: `${pageNumber}2`, from: 'Soporte Técnico (Ecclesiared)', subject: `Verificador de documentos ${pageNumber}`, date: '24 Oct 2023 - 5:53', isReply: false },
        { id: `${pageNumber}3`, from: 'Soporte Técnico (Ecclesiared)', subject: `RE: Mensaje de soporte: Nuevo diseño ${pageNumber}`, date: '06 Jun 2023 - 3:49', isReply: true },
        { id: `${pageNumber}4`, from: 'Soporte Técnico (Ecclesiared)', subject: `10 mayo - Curso GRATUITO Nuevas tendencias tecnológicas ${pageNumber}`, date: '03 May 2023 - 4:31', isReply: false },
        { id: `${pageNumber}5`, from: 'Soporte Técnico (Ecclesiared)', subject: `RE: Mensaje de soporte ${pageNumber}`, date: '05 Abr 2023 - 9:53', isReply: false },
      ];
      setMessages(prevMessages => [...prevMessages, ...newMessages]);
      setLoading(false);
    }, 1000);
  };
  */
const fetchMessages = async (pageNumber) => {
  setLoading(true);
  try {
    // Llamamos a la función de la API que devuelve los mensajes Enviados
    const response = await getMensajesEnviados();
    const newMessages = response.map((message) => ({
      id: message.id,
      from: message.de,  // Aquí se mapea el campo "de" a "from"
      subject: message.asunto,  // Aquí se mapea el campo "asunto"
      date: new Date(message.fecha).toLocaleString(),  // Formatea la fecha
      isReply: message.respondido === '1',  // Establece si es respuesta
    }));

    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  } catch (error) {
    console.error('Error fetching messages:', error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchMessages(page);
}, [page]);


  useEffect(() => {
    const filtered = messages.filter(message => 
      message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchQuery, messages]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem} onPress={() => navigation.navigate('ECMessages', { 
      messageId: item.id,
      subject: item.subject // Make sure to pass the subject here
    })}>
      <View style={styles.messageHeader}>
        <Ionicons 
          name={item.isReply ? "arrow-undo" : "mail"} 
          size={20} 
          color="#1AB394" 
        />
        <Text style={styles.fromText} numberOfLines={1}>{item.from}</Text>
      </View>
      <Text style={styles.subjectText} numberOfLines={2}>{item.subject}</Text>
      <View style={styles.messageFooter}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="eye-outline" size={20} color="#1AB394" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color="#1AB394" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#1AB394" />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#1AB394" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar mensajes Enviados..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredMessages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  messageItem: {
    backgroundColor: 'white',
    padding: 15,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fromText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  subjectText: {
    fontSize: 14,
    marginBottom: 5,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default ECEnviados;