// services/api.js
import { Linking } from 'react-native'; // Lo usas para openWeb

const SESSION = "fc3791a0-4960-4b99-99ec-f87e9c991286"; // Hardcodeada

// Función para obtener configuraciones
export const getConfiguracion = async () => {
  const response = await fetch(`https://api.mintrared.com/api.php/configuracion?session=${SESSION}`);
  return response.json();
};

// Función para obtener información del panel
export const getPanel = async () => {
//  const response = await fetch(`https://api.mintrared.com/api.php/panel?session=${SESSION}`);
  const response = await fetch(`https://alexcd2000.com/1.json`);
  return response.json();
};

// Funciones para comunicaciones
export const getMensajesEnviados = async () => {
  const response = await fetch(`https://api.mintrared.com/api.php/comunicacion/enviados?session=${SESSION}`);
  return response.json();
};

export const getMensajesRecibidos = async () => {
  const response = await fetch(`https://api.mintrared.com/api.php/comunicacion/recibidos?session=${SESSION}`);
  return response.json();
};

export const getDetalleMensaje = async (id) => {
  const response = await fetch(`https://api.mintrared.com/api.php/comunicacion/detalle/${id}?session=${SESSION}`);
  return response.json();
};

// Función para actualizar datos del usuario
export const actualizarUsuario = async (datos) => {
  try {
    const response = await fetch(`https://api.mintrared.com/api.php/actualizacion?session=${SESSION}`, {    
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    const responseText = await response.text(); // Obtener texto completo de la respuesta
    console.log("Respuesta de la API (texto):", responseText);

    // Eliminar todo lo que no sea JSON con una expresión regular
    const cleanResponse = responseText.replace(/^[^{[]*/, ''); // Elimina cualquier contenido antes de '{' o '['
    console.log("Respuesta limpiada:", cleanResponse);

    // Intentar convertir a JSON
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al procesar la respuesta de la API:", error);
    return { success: 0, error: "Error de conexión o respuesta no válida" };
  }
};


// Función para enviar mensajes
export const enviarMensaje = async (mensaje) => {
  try {
    console.log("Enviado (payload):", JSON.stringify(mensaje) );
    const response = await fetch(
      `https://api.mintrared.com/api.php/comunicacion/enviar?session=${SESSION}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mensaje),
      }
    );

    const responseText = await response.text();
    console.log("Mensaje enviado (texto respuesta):", responseText);

    // Limpiar respuesta en caso de errores HTML
    const cleanResponse = responseText.replace(/^[^{[]*/, '');
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    return { success: false, error: "Error de conexión o respuesta no válida" };
  }
};



export const openWebPage = () => {
  const url = `https://gestion.mintrared.com/new/panel.php?session=${SESSION}`;
  Linking.openURL(url).catch((err) => console.error('Error al abrir la URL: ', err));
};

//enpoint de los eventos
export const getEventos = async (mes, anio) => {
  try {
    const response = await fetch(
      `https://api.mintrared.com/api.php/eventos/${mes}/${anio}?session=${SESSION}`
    );
    const responseText = await response.text();
    console.log("Respuesta eventos (texto):", responseText);

    // Limpiar respuesta en caso de errores HTML
    const cleanResponse = responseText.replace(/^[^{[]*/, '');
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    return [];
  }
};

//Endpoint redactar
// Obtener lista de países
export const getPaises = async () => {
  try {
    const response = await fetch(
      `https://api.mintrared.com/api.php/paises?session=${SESSION}`
    );
    const responseText = await response.text();
    console.log("Paises (texto):", responseText);

    const cleanResponse = responseText.replace(/^[^{[]*/, '');
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al obtener los países:", error);
    return [];
  }
};

// Obtener lista de diócesis según el ID del país
export const getDiocesis = async (idPais) => {
  try {
    const response = await fetch(
      `https://api.mintrared.com/api.php/diocesis/${idPais}?session=${SESSION}`
    );
    const responseText = await response.text();
    console.log("Diócesis (texto):", responseText);

    const cleanResponse = responseText.replace(/^[^{[]*/, '');
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al obtener las diócesis:", error);
    return [];
  }
};

// Obtener lista de parroquias según el ID de la diócesis
export const getParroquias = async (idDiocesis) => {
  try {
    const response = await fetch(
      `https://api.mintrared.com/api.php/parroquias/${idDiocesis}?session=${SESSION}`
    );
    const responseText = await response.text();
    console.log("Parroquias (texto):", responseText);

    const cleanResponse = responseText.replace(/^[^{[]*/, '');
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al obtener las parroquias:", error);
    return [];
  }
};

// Obtener lista de usuarios según el ID de la parroquia
export const getUsuarios = async (idParroquia) => {
  try {
    const response = await fetch(
      `https://api.mintrared.com/api.php/usuarios/${idParroquia}?session=${SESSION}`
    );
    const responseText = await response.text();
    console.log("Usuarios (texto):", responseText);

    const cleanResponse = responseText.replace(/^[^{[]*/, '');
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
};
