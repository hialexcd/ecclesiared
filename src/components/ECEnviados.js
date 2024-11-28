import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ECEnviados = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Simulated data fetch - replace this with your actual API call
  const fetchMessages = (pageNumber) => {
    setLoading(true);
    // Simulating an API call
    setTimeout(() => {
      const newMessages = [
        { id: `${pageNumber}1`, to: 'Soporte Técnico (Ecclesiared)', subject: `Solicitud de asistencia ${pageNumber}`, date: '10 Febrero 2024 - 15:27' },
        { id: `${pageNumber}2`, to: 'Administración Parroquial', subject: `Informe mensual ${pageNumber}`, date: '28 Oct 2023 - 9:53' },
        { id: `${pageNumber}3`, to: 'Comité de Eventos', subject: `Planificación de la fiesta patronal ${pageNumber}`, date: '15 Jun 2023 - 11:49' },
        { id: `${pageNumber}4`, to: 'Voluntarios', subject: `Convocatoria para el nuevo proyecto comunitario ${pageNumber}`, date: '05 May 2023 - 18:31' },
        { id: `${pageNumber}5`, to: 'Diócesis', subject: `Solicitud de recursos adicionales ${pageNumber}`, date: '12 Abr 2023 - 10:53' },
      ];
      setMessages(prevMessages => [...prevMessages, ...newMessages]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMessages(page);
  }, [page]);

  useEffect(() => {
    const filtered = messages.filter(message => 
      message.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchQuery, messages]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem}>
      <View style={styles.messageHeader}>
        <Ionicons name="paper-plane-outline" size={20} color="#26A69A" />
        <Text style={styles.toText} numberOfLines={1}>{item.to}</Text>
      </View>
      <Text style={styles.subjectText} numberOfLines={2}>{item.subject}</Text>
      <View style={styles.messageFooter}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="eye-outline" size={20} color="#26A69A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color="#26A69A" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#26A69A" />
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
        <Ionicons name="search" size={20} color="#26A69A" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar mensajes enviados..."
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
  toText: {
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