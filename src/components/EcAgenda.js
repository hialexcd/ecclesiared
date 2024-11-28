import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const EcAgenda = () => {
  const [currentMonth, setCurrentMonth] = useState('2024-09');

  const markedDates = {
    '2024-09-06': { selected: true, selectedColor: '#26A69A' },
    '2024-09-10': { selected: true, selectedColor: '#D32F2F' },
    '2024-09-20': { selected: true, selectedColor: '#D32F2F' },
    '2024-09-23': { selected: true, selectedColor: '#26A69A' },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Agenda Interior</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.webButton]}>
            <Text style={styles.buttonText}>Añadir eventos a la web</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.agendaButton]}>
            <Text style={styles.buttonText}>Añadir eventos a la agenda</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Calendar
        current={currentMonth}
        onMonthChange={(month) => setCurrentMonth(month.dateString)}
        markedDates={markedDates}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: '#26A69A',
          monthTextColor: '#26A69A',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
        }}
      />
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
    padding: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  webButton: {
    backgroundColor: '#26A69A',
  },
  agendaButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  navButton: {
    backgroundColor: '#26A69A',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#26A69A',
    padding: 16,
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
});

export default EcAgenda;