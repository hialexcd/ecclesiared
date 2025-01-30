import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox } from 'react-native-elements';

const ECParoquia = () => {
  const [seal, setSeal] = useState(null);
  const [signature, setSignature] = useState(null);
  //const [priest, setPriest] = useState('Domingo Eduardo Castillo Peña');
  const [anagram, setAnagram] = useState(null);
  const [parish, setParish] = useState('Parroquia Santa Isabel de Hungría la Tablaza');
  const [archpresbytery, setArchpresbytery] = useState('Arquidiócesis de Santiago');
  const [number, setNumber] = useState('');
  const [department, setDepartment] = useState('Antioquia');
  const [population, setPopulation] = useState('Medellín');
  const [website, setWebsite] = useState('www.ParroquiaSantaMargaritaMaria');
  const [hasMultipleCelebrationPlaces, setHasMultipleCelebrationPlaces] = useState(true);
  const [vicariate, setVicariate] = useState('Parroquia');
  const [pastoralZone, setPastoralZone] = useState('Oeste');
  const [nit, setNit] = useState('989-0000788');
  const [postalAddress, setPostalAddress] = useState('Avda. Virgen de los Milagros');
  const [postalCode, setPostalCode] = useState('42100');
  const [contactPerson, setContactPerson] = useState('Luis Aguilar');
  const [email, setEmail] = useState('demo@gmail.com');
  const [phone, setPhone] = useState('2257-369874');
  const [fax, setFax] = useState('2257-369874');

  // State for dropdowns
  const [priestOpen, setPriestOpen] = useState(false);
  const [priestValue, setPriestValue] = useState('Domingo Eduardo Castillo Peña');
  const [priests, setPriests] = useState([
    { label: 'Domingo Eduardo Castillo Peña', value: 'Domingo Eduardo Castillo Peña' },
    // Add more priest options here
  ]);

  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [departmentValue, setDepartmentValue] = useState('Antioquia');
  const [departments, setDepartments] = useState([
    { label: 'Antioquia', value: 'Antioquia' },
    // Add more department options
  ]);

  const [populationOpen, setPopulationOpen] = useState(false);
  const [populationValue, setPopulationValue] = useState('Medellín');
  const [populations, setPopulations] = useState([
    { label: 'Medellín', value: 'Medellín' },
    // Add more population options
  ]);

  const handleImageUpload = (type) => {
    // Implement image upload logic
    console.log(`Uploading ${type}`);
  };

  const handleSubmit = () => {
    // Implement form submission logic
    console.log('Submitting parish details');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Sello</Text>
      <View style={styles.imageContainer}>
        {seal ? (
          <Image source={{ uri: seal }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.imageActions}>
          <TouchableOpacity onPress={() => handleImageUpload('seal')}><Text>👁️</Text></TouchableOpacity>
          <TouchableOpacity><Text>✂️</Text></TouchableOpacity>
          <TouchableOpacity><Text>🔄</Text></TouchableOpacity>
          <TouchableOpacity><Text>🗑️</Text></TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Su firma</Text>
      <View style={styles.imageContainer}>
        {signature ? (
          <Image source={{ uri: signature }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.imageActions}>
          <TouchableOpacity onPress={() => handleImageUpload('signature')}><Text>👁️</Text></TouchableOpacity>
          <TouchableOpacity><Text>✂️</Text></TouchableOpacity>
          <TouchableOpacity><Text>🔄</Text></TouchableOpacity>
          <TouchableOpacity><Text>🗑️</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text>La firma va asociada al usuario en el que está trabajando. Si quiere que otra persona disponga de su firma, deberá ese usuario subirla en su usuario.</Text>
      </View>

      <Text style={styles.label}>Sacerdote actual</Text>
      <DropDownPicker
        open={priestOpen}
        value={priestValue}
        items={priests}
        setOpen={setPriestOpen}
        setValue={setPriestValue}
        setItems={setPriests}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <View style={styles.infoBox}>
        <Text>El sacerdote que seleccione en el desplegable es el que quedará seleccionado por defecto en el momento de extraer cualquier partida o documento de Ecclesiared.</Text>
      </View>

      <View style={styles.infoBox}>
        <Text>Una vez subida cada una de las imágenes, tendrá la opción de recortarla mediante nuestra herramienta.</Text>
      </View>

      <Text style={styles.sectionTitle}>Anagrama</Text>
      <View style={styles.imageContainer}>
        {anagram ? (
          <Image source={{ uri: anagram }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.imageActions}>
          <TouchableOpacity onPress={() => handleImageUpload('anagram')}><Text>👁️</Text></TouchableOpacity>
          <TouchableOpacity><Text>✂️</Text></TouchableOpacity>
          <TouchableOpacity><Text>🔄</Text></TouchableOpacity>
          <TouchableOpacity><Text>🗑️</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text>Desde aquí podrá modificar todos los datos de su Parroquia.</Text>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Modificar datos de la Parroquia</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Nombre de la parroquia</Text>
      <TextInput
        style={styles.input}
        value={parish}
        onChangeText={setParish}
      />

      <Text style={styles.label}>Nombre arciprestazgo</Text>
      <TextInput
        style={styles.input}
        value={archpresbytery}
        onChangeText={setArchpresbytery}
      />

      <Text style={styles.label}>Número</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
      />

      <Text style={styles.label}>Departamento</Text>
      <DropDownPicker
        open={departmentOpen}
        value={departmentValue}
        items={departments}
        setOpen={setDepartmentOpen}
        setValue={setDepartmentValue}
        setItems={setDepartments}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <Text style={styles.label}>Población</Text>
      <DropDownPicker
        open={populationOpen}
        value={populationValue}
        items={populations}
        setOpen={setPopulationOpen}
        setValue={setPopulationValue}
        setItems={setPopulations}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <Text style={styles.label}>Página web</Text>
      <TextInput
        style={styles.input}
        value={website}
        onChangeText={setWebsite}
      />

      <CheckBox
        title="Tiene varios lugares de celebración"
        checked={hasMultipleCelebrationPlaces}
        onPress={() => setHasMultipleCelebrationPlaces(!hasMultipleCelebrationPlaces)}
      />

      <Text style={styles.label}>Vicaría</Text>
      <TextInput
        style={styles.input}
        value={vicariate}
        onChangeText={setVicariate}
      />

      <Text style={styles.label}>Zona pastoral</Text>
      <TextInput
        style={styles.input}
        value={pastoralZone}
        onChangeText={setPastoralZone}
      />

      <Text style={styles.label}>NIT</Text>
      <TextInput
        style={styles.input}
        value={nit}
        onChangeText={setNit}
      />

      <Text style={styles.label}>Dirección postal</Text>
      <TextInput
        style={styles.input}
        value={postalAddress}
        onChangeText={setPostalAddress}
      />

      <Text style={styles.label}>Código postal</Text>
      <TextInput
        style={styles.input}
        value={postalCode}
        onChangeText={setPostalCode}
      />

      <Text style={styles.label}>Persona de contacto</Text>
      <TextInput
        style={styles.input}
        value={contactPerson}
        onChangeText={setContactPerson}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Fax</Text>
      <TextInput
        style={styles.input}
        value={fax}
        onChangeText={setFax}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Modificar datos de la Parroquia</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#1AB394',
    color: '#fff',
    padding: 10,
    marginVertical: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  infoBox: {
    backgroundColor: '#e1f5fe',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
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
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#1AB394',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ECParoquia;