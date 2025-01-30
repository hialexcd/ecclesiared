import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MessageFolders from './MessageFolders';
import ECDocumentPicker from './ECDocumentPicker';
import { getPaises, getDiocesis, getParroquias, getUsuarios, enviarMensaje } from '../services/api';

const ComposeMessageScreen = () => {
  const [paises, setPaises] = useState([]);
  const [diocesis, setDiocesis] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [selectedPais, setSelectedPais] = useState(null);
  const [selectedDiocesis, setSelectedDiocesis] = useState(null);
  const [selectedParroquia, setSelectedParroquia] = useState(null);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPaises = async () => {
      const data = await getPaises();
      console.log("Paises cargados:", data);
      setPaises(
        data
          .filter((pais) => pais && Object.keys(pais)[0])
          .map((pais) => {
            const id = Object.keys(pais)[0];
            const nombre = pais[id];
            return { label: nombre, value: id };
          })
      );
    };
    fetchPaises();
  }, []);

  useEffect(() => {
    if (selectedPais) {
      const fetchDiocesis = async () => {
        const data = await getDiocesis(selectedPais);
        console.log("Diócesis cargadas:", data);
        setDiocesis(
          data
            .filter((diocesis) => diocesis && Object.keys(diocesis)[0])
            .map((diocesis) => {
              const id = Object.keys(diocesis)[0];
              const nombre = diocesis[id];
              return { label: nombre, value: id };
            })
        );
      };
      fetchDiocesis();
    } else {
      setDiocesis([]);
      setParroquias([]);
      setUsuarios([]);
    }
  }, [selectedPais]);

  useEffect(() => {
    if (selectedDiocesis) {
      const fetchParroquias = async () => {
        const data = await getParroquias(selectedDiocesis);
        console.log("Parroquias cargadas:", data);
        setParroquias(
          data
            .filter((parroquia) => parroquia && Object.keys(parroquia)[0])
            .map((parroquia) => {
              const id = Object.keys(parroquia)[0];
              const nombre = parroquia[id];
              return { label: nombre, value: id };
            })
        );
      };
      fetchParroquias();
    } else {
      setParroquias([]);
      setUsuarios([]);
    }
  }, [selectedDiocesis]);

  useEffect(() => {
    if (selectedParroquia) {
      const fetchUsuarios = async () => {
        const data = await getUsuarios(selectedParroquia);
        console.log("Usuarios cargados:", data);
        setUsuarios(
          data
            .filter((usuario) => usuario && usuario.id)
            .map((usuario) => ({
              label: usuario.nombre,
              value: usuario.id,
              color: usuario.admin_parroquia === 1 ? 'red' : 'black',
            }))
        );
      };
      fetchUsuarios();
    } else {
      setUsuarios([]);
    }
  }, [selectedParroquia]);

const handleSend = async () => {
  if (!selectedUsuario || !subject || !message) {
    Alert.alert('Error', 'Por favor complete todos los campos antes de enviar.');
    return;
  }

  const payload = {
    "reply-to": 0, // Cambiar a ID correspondiente si es una respuesta
    asunto: subject,
    message: message,
    to: [selectedUsuario], // Convertir a array
  };

  try {
    const response = await enviarMensaje(payload);

    console.log("Respuesta del servidor:", response);

    if (response.success) {
      Alert.alert('Éxito', 'Mensaje enviado correctamente');
    } else {
      Alert.alert('Error', response.error?.message || 'Hubo un problema al enviar el mensaje del lado del servidor');
    }
  } catch (error) {
    Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
    console.error(error);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <MessageFolders />
        <Text style={styles.header}>Redactar Mensaje</Text>

        <Text style={styles.label}>País</Text>
        <Picker
          selectedValue={selectedPais}
          onValueChange={(itemValue) => setSelectedPais(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un país" value={null} />
          {paises.map((pais) => (
            <Picker.Item label={pais.label} value={pais.value} key={`pais-${pais.value}`} />
          ))}
        </Picker>

        <Text style={styles.label}>Diócesis</Text>
        <Picker
          selectedValue={selectedDiocesis}
          onValueChange={(itemValue) => setSelectedDiocesis(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una diócesis" value={null} />
          {diocesis.map((diocesis) => (
            <Picker.Item label={diocesis.label} value={diocesis.value} key={`diocesis-${diocesis.value}`} />
          ))}
        </Picker>

        <Text style={styles.label}>Parroquia</Text>
        <Picker
          selectedValue={selectedParroquia}
          onValueChange={(itemValue) => setSelectedParroquia(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una parroquia" value={null} />
          {parroquias.map((parroquia) => (
            <Picker.Item label={parroquia.label} value={parroquia.value} key={`parroquia-${parroquia.value}`} />
          ))}
        </Picker>

        <Text style={styles.label}>Usuario</Text>
        <Picker
          selectedValue={selectedUsuario}
          onValueChange={(itemValue) => setSelectedUsuario(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un usuario" value={null} />
          {usuarios.map((usuario) => (
            <Picker.Item label={usuario.label} value={usuario.value} key={`usuario-${usuario.value}`} />
          ))}
        </Picker>

        <Text style={styles.label}>Asunto</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Asunto del mensaje"
        />

        <Text style={styles.label}>Mensaje</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          value={message}
          onChangeText={setMessage}
          placeholder="Escriba su mensaje aquí"
          multiline
        />

        <ECDocumentPicker />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar mensaje</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1AB394',
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  picker: {
    height: 50,
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#1AB394',
    padding: 16,
    alignItems: 'center',
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ComposeMessageScreen;
