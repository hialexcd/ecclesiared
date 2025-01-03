import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { getEventos } from '../services/api'; // Importar la función

const EcAgenda = () => {
  const [currentMonth, setCurrentMonth] = useState('2024-09');
  const [markedDates, setMarkedDates] = useState({});
  const [eventos, setEventos] = useState([]);

  // Cargar eventos cuando cambia el mes
  useEffect(() => {
    const fetchEventos = async () => {
      const [anio, mes] = currentMonth.split('-');
      const eventosData = await getEventos(mes, anio);

      // Convertir eventos en formato compatible con markedDates
      const newMarkedDates = {};
      eventosData.forEach((evento) => {
        const fecha = `${anio}-${mes}-${evento.dia.padStart(2, '0')}`;
        newMarkedDates[fecha] = {
          selected: true,
          selectedColor: evento.diocesis ? '#D32F2F' : '#26A69A', // Rojo si es diocesano, verde si es parroquial
          event: evento, // Adjuntar datos del evento
        };
      });

      setMarkedDates(newMarkedDates);
      setEventos(eventosData);
    };

    fetchEventos();
  }, [currentMonth]);

//decodifica el json para que se muestre bien
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
    .replace(/ReuniÃ³n/g, 'Reunión') // Caso específico mal codificado
    .replace(/economÃ­a/g, 'economía') // Caso específico de economía mal codificado
    .replace(/<br\s*\/?>/g, '\n') // Reemplaza <br> o <br /> por salto de línea
    .replace(/<[^>]+>/g, ''); // Elimina cualquier otra etiqueta HTML
};
    
// Manejar clic en un día marcado
const handleDayPress = (day) => {
  const event = markedDates[day.dateString]?.event;
  if (event) {
    Alert.alert(
      `Evento del ${day.dateString}`,
      `Día: ${event.dia}\n${decodeHtmlEntities(event.contenido)}`, // Decodificar el contenido
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
        onDayPress={handleDayPress} // Detectar clic en un día
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
