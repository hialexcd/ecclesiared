import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { getConfiguracion } from '../services/api';  // Importa la función desde endpoints

const EcDatos = () => {
  const [nombre, setNombre] = useState('Fulano');
  const [apellidos, setApellidos] = useState('Mengano');
  const [email, setEmail] = useState('algo@mail.com');
  const [telefono, setTelefono] = useState('');
  const [aceptaMensajes, setAceptaMensajes] = useState(true);
  const [usuario, setUsuario] = useState('user');
  const [contrasena, setContrasena] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');

  // Llamada a la API de configuración para obtener los datos del usuario
  useEffect(() => {
    const fetchConfiguracion = async () => {
      try {
        const data = await getConfiguracion(); // Llamada a la API
        setNombre(data.nombre);
        setApellidos(data.apellidos);
        setEmail(data.email);
        setUsuario(data.usuario);
        // Aquí puedes inicializar otros campos si es necesario
      } catch (error) {
        console.error("Error al obtener los datos de configuración:", error);
      }
    };

    fetchConfiguracion();
  }, []); // Solo se ejecuta una vez cuando el componente se monta
    
  const handleSubmit = () => {
    // Implement your submit logic here
    console.log('Form submitted');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modificar datos</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          value={apellidos}
          onChangeText={setApellidos}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <CheckBox
          title="Acepto recibir mensajes de otras parroquias"
          checked={aceptaMensajes}
          onPress={() => setAceptaMensajes(!aceptaMensajes)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
        />

        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />
        <Text style={styles.passwordHint}>Tiene que introducir un mínimo de 8 caracteres</Text>

        <Text style={styles.label}>Repite contraseña</Text>
        <TextInput
          style={styles.input}
          value={repetirContrasena}
          onChangeText={setRepetirContrasena}
          secureTextEntry
        />

        <Text style={styles.parroquiaText}>
          Parroquia <Text style={styles.parroquiaName}>Parroquia Santa Isabel de Hungría la Tablaza</Text>
        </Text>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Modificar datos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#26A69A',
    padding: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
  },
  checkboxText: {
    fontWeight: 'normal',
  },
  passwordHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  parroquiaText: {
    marginTop: 15,
    fontSize: 16,
  },
  parroquiaName: {
    color: 'red',
  },
  submitButton: {
    backgroundColor: '#26A69A',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EcDatos;