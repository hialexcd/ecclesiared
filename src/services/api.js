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
//  const response = await fetch(`https://api.mintrared.com/api.php/comunicacion/enviar?session=${SESSION}`, {
  const response = await fetch(`https://webhook.site/954812e7-8f75-49a8-bb5a-bcd4d8db7b9b?session=${SESSION}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mensaje),
  });
  return response.json();
};

export const openWebPage = () => {
  const url = `https://gestion.mintrared.com/new/panel.php?session=${SESSION}`;
  Linking.openURL(url).catch((err) => console.error('Error al abrir la URL: ', err));
};
