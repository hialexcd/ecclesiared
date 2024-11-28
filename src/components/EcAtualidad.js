import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const newsData = [
  {
    id: '1',
    date: '14 de SEPTIEMBRE 2024',
    title: '1 de septiembre: oremos y reflexionemos por el Cuidado de la Creación'
  },
  {
    id: '2',
    date: '14 de SEPTIEMBRE 2024',
    title: 'Iglesia colombiana acoge el II Encuentro de responsables de prevención de abusos de las Conferencias Episcopales de Latinoamérica y el Caribe'
  },
  {
    id: '3',
    date: '14 de SEPTIEMBRE 2024',
    title: 'Obispos colombianos dieron el primer paso hacia la consolidación de la pastoral indígena'
  },
  {
    id: '4',
    date: '14 de SEPTIEMBRE 2024',
    title: 'Proteger la vida, vencer la indiferencia, disponerse al diálogo y conservar la institucionalidad: llamados de los Obispos al pueblo colombiano'
  },
  {
    id: '5',
    date: '14 de SEPTIEMBRE 2024',
    title: 'La esperada y emotiva posesión canónica de monseñor Dimas Acuña Jiménez en la Diócesis de El Banco'
  },
];

const NewsItem = ({ item }) => (
  <View style={styles.newsItem}>
    <View style={styles.dateContainer}>
      <Ionicons name="calendar-outline" size={16} color="#26A69A" />
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
    <Text style={styles.newsTitle}>{item.title}</Text>
  </View>
);

const EcActualidad = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Actualidad de la Conferencia Episcopal Colombiana</Text>
      <FlatList
        data={newsData}
        renderItem={({ item }) => <NewsItem item={item} />}
        keyExtractor={item => item.id}
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
    backgroundColor: '#26A69A',
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
    borderLeftColor: '#26A69A',
    paddingLeft: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    color: '#26A69A',
    marginLeft: 4,
    fontSize: 12,
  },
  newsTitle: {
    fontSize: 16,
    color: '#26A69A',
  },
});

export default EcActualidad;