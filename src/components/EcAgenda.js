import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { getEventos } from '../services/api'; // Importar la función

// Configuración del idioma en español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const EcAgenda = () => {
  const [currentMonth, setCurrentMonth] = useState('2024-09');
  const [markedDates, setMarkedDates] = useState({});
  const [eventos, setEventos] = useState([]);

  // Cargar eventos cuando cambia el mes
  useEffect(() => {
    const fetchEventos = async () => {
      const [anio, mes] = currentMonth.split('-');
      const eventosData = await getEventos(mes, anio);

      const newMarkedDates = {};
      eventosData.forEach((evento) => {
        const fecha = `${anio}-${mes}-${evento.dia.padStart(2, '0')}`;
        newMarkedDates[fecha] = {
          selected: true,
          selectedColor: evento.diocesis ? '#D32F2F' : '#1AB394',
          event: evento,
        };
      });

      setMarkedDates(newMarkedDates);
      setEventos(eventosData);
    };

    fetchEventos();
  }, [currentMonth]);

const decodeHtmlEntities = (text) => {
  return text
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&Ntilde;/g, 'Ñ')
    .replace(/&uuml;/g, 'ü')
    .replace(/&Uuml;/g, 'Ü')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '');
};
    
const handleDayPress = (day) => {
  const event = markedDates[day.dateString]?.event;
  if (event) {
    Alert.alert(
      `Evento del ${day.dateString}`,
      `Día: ${event.dia}\n${decodeHtmlEntities(event.contenido)}`,
      [{ text: 'OK' }]
    );
  } else {
    Alert.alert('Sin eventos', 'No hay eventos programados para este día.');
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Agenda Interior</Text>
      </View>
      <Calendar
        current={currentMonth}
        onMonthChange={(month) => setCurrentMonth(month.dateString)}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        firstDay={1} // Comienza la semana en lunes
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
          arrowColor: '#1AB394',
          monthTextColor: '#1AB394',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
        }}
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
    padding: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EcAgenda;
