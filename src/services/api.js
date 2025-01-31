import { Alert, Linking } from "react-native"; // para openweb linking
import { registerIndieID } from 'native-notify'; //estos dos para el push
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';//para guardar la sesión realmente al instalar

// Manejo de sesión en memoria
let currentSession = null;

//función guardar sesión en memoria
const saveSession = async (session) => {
  try {
    await AsyncStorage.setItem('userSession', session);
  } catch (error) {
    console.error("Error guardando la sesión:", error);
  }
};
// para leer la sesión de memoria
export const loadSession = async () => {
  try {
    const session = await AsyncStorage.getItem('userSession');
    if (session) {
      currentSession = session;
    }
    return session;
  } catch (error) {
    console.error("Error al cargar la sesión:", error);
    return null;
  }
};


// Función de login adaptada para usar Indie ID
export const login = async (username, password) => {
  try {
    const url = "https://api.mintrared.com/api.php/login"; // Endpoint del login

    const data = {
      user: username,
      pwd: password,
      push_token: username, // Envía el email del usuario como identificador
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { success: false, error: "Error en la conexión con el servidor" };
    }

    const responseData = await response.json();
      
    if (responseData && responseData.response && responseData.response !== "0") {
      currentSession = responseData.response; // Guardar sesión en memoria
          await saveSession(currentSession); // Guardar en AsyncStorage

        // Registrar al usuario en NativeNotify con su session como Indie ID
       registerIndieID(responseData.response, 26947, "X2IskvSUeT1DcANCxJuZDD");

      Alert.alert(
        "Login Exitoso",
        `Session: ${currentSession}`,
        [{ text: "OK" }]
      );

      console.log("Login exitoso. Sesión iniciada:", currentSession);
      return { success: true, session: currentSession };
    } else {
      console.log("Login fallido: Credenciales incorrectas.");
      return { success: false, error: `Credenciales incorrectas para ${username}` };
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    Alert.alert(
      "Error",
      `No se pudo completar el login: ${error.message || "Error desconocido"}`,
      [{ text: "OK" }]
    );
    return { success: false, error: "Error de conexión o configuración" };
  }
};

// Verificar si el usuario está autenticado
export const isLoggedIn = async () => {
  return await loadSession() !== null;
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userSession');
    currentSession = null;
  } catch (error) {
    console.error("Error al eliminar la sesión:", error);
  }
};

// Función para obtener configuraciones
export const getConfiguracion = async () => {
  const response = await fetch(
    `https://api.mintrared.com/api.php/configuracion?session=${currentSession}`
  );
  return response.json();
};

// Función para obtener la información del panel
export const getPanel = async () => {
  try {
    const response = await fetch(
      `https://api.mintrared.com/api.php/panel?session=${currentSession}`
    );
    const responseText = await response.text();
    const cleanResponse = responseText.replace(/^[^{[]*/, "");
    const data = JSON.parse(cleanResponse);

    // Obtener los 5 años más recientes ordenados
    const years = Object.keys(data.estadisticas).sort((a, b) => b - a).slice(0, 5);
    
    // Formatear estadísticas en la estructura deseada
    const formattedStats = {
      Bautismos: [],
      Matrimonios: [],
      Confirmaciones: [],
      Defunciones: [],
      Comuniones: []
    };

    years.forEach((year) => {
      formattedStats.Bautismos.push(data.estadisticas[year].bautismos || 0);
      formattedStats.Matrimonios.push(data.estadisticas[year].matrimonios || 0);
      formattedStats.Confirmaciones.push(data.estadisticas[year].confirmaciones || 0);
      formattedStats.Defunciones.push(data.estadisticas[year].defunciones || 0);
      formattedStats.Comuniones.push(data.estadisticas[year].comuniones || 0);
    });

    return {
      estadisticas: formattedStats,
      noticias_izquierda: data.noticias_izquierda || [],
      noticias_derecha: data.noticias_derecha || []
    };
  } catch (error) {
    console.error("Error al obtener el panel:", error);
    return {
      estadisticas: {
        Bautismos: [0, 0, 0, 0, 0],
        Matrimonios: [0, 0, 0, 0, 0],
        Confirmaciones: [0, 0, 0, 0, 0],
        Defunciones: [0, 0, 0, 0, 0],
        Comuniones: [0, 0, 0, 0, 0],
      },
      noticias_izquierda: [],
      noticias_derecha: []
    };
  }
};

// Funciones para comunicaciones
export const getMensajesEnviados = async () => {
  const response = await fetch(`https://api.mintrared.com/api.php/comunicacion/enviados?session=${currentSession}`);
  return response.json();
};

export const getMensajesRecibidos = async () => {
  const response = await fetch(`https://api.mintrared.com/api.php/comunicacion/recibidos?session=${currentSession}`);
  return response.json();
};

export const getDetalleMensaje = async (id) => {
  const response = await fetch(`https://api.mintrared.com/api.php/comunicacion/detalle/${id}?session=${currentSession}`);
  return response.json();
};

// Función para actualizar datos del usuario
export const actualizarUsuario = async (datos) => {
  try {
    const response = await fetch(`https://api.mintrared.com/api.php/actualizacion?session=${currentSession}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    const responseText = await response.text();
    const cleanResponse = responseText.replace(/^[^{[]*/, '');
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al procesar la respuesta de la API:", error);
    return { success: 0, error: "Error de conexión o respuesta no válida" };
  }
};

// Función para enviar mensajes
export const enviarMensaje = async (mensaje) => {
  try {
    const response = await fetch(
      `https://api.mintrared.com/api.php/comunicacion/enviar?session=${currentSession}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mensaje),
      }
    );

    const responseText = await response.text();
    const cleanResponse = responseText.replace(/^[^{[]*/, '');
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    return { success: false, error: "Error de conexión o respuesta no válida" };
  }
};

export const openWebPage = () => {
  const url = `https://gestion.mintrared.com/new/panel.php?session=${currentSession}`;
  Linking.openURL(url).catch((err) => console.error('Error al abrir la URL: ', err));
};

// Función para obtener eventos
export const getEventos = async (mes, anio) => {
  try {
    const response = await fetch(
      `https://api.mintrared.com/api.php/eventos/${mes}/${anio}?session=${currentSession}`
    );
    const responseText = await response.text();
    const cleanResponse = responseText.replace(/^[^{[]*/, '');
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    return [];
  }
};

// Función para obtener países
export const getPaises = async () => {
  const response = await fetch(`https://api.mintrared.com/api.php/paises?session=${currentSession}`);
  const responseText = await response.text();
  const cleanResponse = responseText.replace(/^[^{[]*/, '');
  return JSON.parse(cleanResponse);
};

// Obtener diócesis
export const getDiocesis = async (idPais) => {
  const response = await fetch(`https://api.mintrared.com/api.php/diocesis/${idPais}?session=${currentSession}`);
  const responseText = await response.text();
  const cleanResponse = responseText.replace(/^[^{[]*/, '');
  return JSON.parse(cleanResponse);
};

// Obtener parroquias
export const getParroquias = async (idDiocesis) => {
  const response = await fetch(`https://api.mintrared.com/api.php/parroquias/${idDiocesis}?session=${currentSession}`);
  const responseText = await response.text();
  const cleanResponse = responseText.replace(/^[^{[]*/, '');
  return JSON.parse(cleanResponse);
};

// Obtener usuarios
export const getUsuarios = async (idParroquia) => {
  const response = await fetch(`https://api.mintrared.com/api.php/usuarios/${idParroquia}?session=${currentSession}`);
  const responseText = await response.text();
  const cleanResponse = responseText.replace(/^[^{[]*/, '');
  return JSON.parse(cleanResponse);
};
