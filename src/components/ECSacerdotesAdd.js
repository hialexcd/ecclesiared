import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

const ECSacerdotesAdd = ({ navigation }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState(null);
  const [position, setPosition] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [idNumber, setIdNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [academicTitle, setAcademicTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [titleOpen, setTitleOpen] = useState(false);
  const [titleItems, setTitleItems] = useState([
    { label: 'Padre', value: 'padre' },
    { label: 'Monseñor', value: 'monsenor' },
  ]);

  const [positionOpen, setPositionOpen] = useState(false);
  const [positionItems, setPositionItems] = useState([
    { label: 'Párroco', value: 'parroco' },
    { label: 'Vicario', value: 'vicario' },
  ]);

  const onChangeBirthDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowBirthDatePicker(false);
    setBirthDate(currentDate);
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const handleSubmit = () => {
    // Implement logic to add the new priest
    console.log('Adding new priest:', {
      name,
      title,
      position,
      birthDate,
      idNumber,
      nationality,
      academicTitle,
      startDate,
      endDate
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del Sacerdote</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre completo"
      />

      <Text style={styles.label}>Título</Text>
      <DropDownPicker
        open={titleOpen}
        value={title}
        items={titleItems}
        setOpen={setTitleOpen}
        setValue={setTitle}
        setItems={setTitleItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <Text style={styles.label}>Cargo</Text>
      <DropDownPicker
        open={positionOpen}
        value={position}
        items={positionItems}
        setOpen={setPositionOpen}
        setValue={setPosition}
        setItems={setPositionItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <Text style={styles.label}>Fecha de nacimiento</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowBirthDatePicker(true)}>
        <Text>{birthDate.toDateString()}</Text>
      </TouchableOpacity>
      {showBirthDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display="default"
          onChange={onChangeBirthDate}
        />
      )}

      <Text style={styles.label}>Cédula o Pasaporte</Text>
      <TextInput
        style={styles.input}
        value={idNumber}
        onChangeText={setIdNumber}
        placeholder="Número de identificación"
      />

      <Text style={styles.label}>Nacionalidad</Text>
      <TextInput
        style={styles.input}
        value={nationality}
        onChangeText={setNationality}
        placeholder="Nacionalidad"
      />

      <Text style={styles.label}>Título académico / Religioso</Text>
      <TextInput
        style={styles.input}
        value={academicTitle}
        onChangeText={setAcademicTitle}
        placeholder="Título académico o religioso"
      />

      <Text style={styles.label}>Periodo desde</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartDatePicker(true)}>
        <Text>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStartDate}
        />
      )}

      <Text style={styles.label}>Periodo hasta</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndDatePicker(true)}>
        <Text>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Añadir Sacerdote</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  dropdown: {
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#ddd',
  },
  dateButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#26A69A',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ECSacerdotesAdd;