import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EcSacerdotes = ({ navigation }) => {
  const [priests, setPriests] = useState([
    { id: '1', name: 'Carlos Rodríguez', title: 'Padre', position: 'Párroco', birthDate: '08/07/1980', idNumber: 'A1234567', nationality: 'Argentino', academicTitle: 'Doctor en Teología', startDate: '01/01/2020', endDate: '31/12/2025' },
    { id: '2', name: 'Juan Pérez', title: 'Monseñor', position: 'Vicario', birthDate: '15/03/1975', idNumber: 'B2345678', nationality: 'Español', academicTitle: 'Licenciado en Filosofía', startDate: '01/06/2019', endDate: '31/05/2024' },
    { id: '3', name: 'Miguel Ángel López', title: 'Padre', position: 'Capellán', birthDate: '22/11/1982', idNumber: 'C3456789', nationality: 'Mexicano', academicTitle: 'Maestría en Estudios Bíblicos', startDate: '15/09/2021', endDate: '14/09/2026' },
    { id: '4', name: 'Antonio Gómez', title: 'Padre', position: 'Párroco', birthDate: '30/04/1978', idNumber: 'D4567890', nationality: 'Colombiano', academicTitle: 'Licenciado en Derecho Canónico', startDate: '01/03/2018', endDate: '28/02/2023' },
    { id: '5', name: 'Francisco Martínez', title: 'Monseñor', position: 'Obispo Auxiliar', birthDate: '12/09/1970', idNumber: 'E5678901', nationality: 'Peruano', academicTitle: 'Doctor en Teología Moral', startDate: '01/01/2022', endDate: '31/12/2027' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPriests, setFilteredPriests] = useState(priests);

  useEffect(() => {
    const filtered = priests.filter(priest => 
      priest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      priest.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      priest.nationality.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPriests(filtered);
  }, [searchQuery, priests]);

  const renderItem = ({ item }) => (
    <View style={styles.priestItem}>
      <Text style={styles.priestName}>{item.name}</Text>
      <Text>Título: {item.title}</Text>
      <Text>Cargo: {item.position}</Text>
      <Text>Fecha de nacimiento: {item.birthDate}</Text>
      <Text>Cédula o Pasaporte: {item.idNumber}</Text>
      <Text>Nacionalidad: {item.nationality}</Text>
      <Text>Título académico / Religioso: {item.academicTitle}</Text>
      <Text>Periodo desde: {item.startDate}</Text>
      <Text>Periodo hasta: {item.endDate}</Text>
    </View>
  );

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar sacerdotes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPriests}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Listado de Sacerdotes</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigateTo('ECSacerdotesAdd')}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 40,
    borderColor: '#26A69A',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#26A69A',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priestItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  priestName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#26A69A',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default EcSacerdotes;