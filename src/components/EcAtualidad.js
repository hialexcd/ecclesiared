import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPanel } from '../services/api'; // Asegúrate de tener esta función de API

const EcActualidad = () => {
  // Estado para almacenar las noticias
  const [noticiasIzquierda, setNoticiasIzquierda] = useState([]);
  
  // Efecto para cargar las noticias desde la API al montar el componente
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const data = await getPanel(); // Llamamos la API
        setNoticiasIzquierda(data.noticias_izquierda); // Guardamos las noticias en el estado
      } catch (error) {
        console.error('Error al cargar las noticias:', error);
      }
    };

    fetchNoticias(); // Ejecutamos la función para obtener los datos
  }, []); // Solo se ejecuta al montar el componente

  // Componente para mostrar una noticia
  const NewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={16} color="#1AB394" />
        <Text style={styles.dateText}>{item.fecha}</Text>
      </View>
      <Text style={styles.newsTitle}>{item.titular}</Text>
      {/* Agregar Linking para abrir la URL cuando se haga clic */}
      <TouchableOpacity onPress={() => Linking.openURL(item.enlace)}>
        <Text style={styles.linkText}>Leer más</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Actualidad de la Conferencia Episcopal Colombiana</Text>
      <FlatList
        data={noticiasIzquierda} // Usamos las noticias obtenidas de la API
        renderItem={({ item }) => <NewsItem item={item} />}
        keyExtractor={item => item.fecha} // Usamos la fecha como ID único
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#1AB394',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  newsItem: {
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#1AB394',
    paddingLeft: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    color: '#1AB394',
    marginLeft: 4,
    fontSize: 12,
  },
  newsTitle: {
    fontSize: 16,
    color: '#1AB394',
  },
  linkText: {
    color: '#1AB394',
    marginTop: 4,
    fontSize: 14,
  },
});

export default EcActualidad;
