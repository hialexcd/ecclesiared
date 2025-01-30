import { Alert, Linking } from "react-native"; // para openweb linking
import { registerIndieID } from 'native-notify'; //estos dos para el push
import axios from 'axios';

// Manejo de sesión en memoria
let currentSession = null;

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
export const isLoggedIn = () => {
  return currentSession !== null;
};

// Función para cerrar sesión
export const logout = () => {
  currentSession = null;
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
  const data = {
    estadisticas: {
      Bautismos: [10, 20, 30, 40, 0],
      Matrimonios: [15, 25, 35, 55, 60],
      Confirmaciones: [5, 10, 15, 25, 60],
      Defunciones: [2, 4, 6, 8, 60],
      Comuniones: [50, 60, 70, 8, 0],
    },
    noticias_izquierda: [
      {
        fecha: "2024-11-22",
        titular:
          "Obispos colombianos convocan colecta nacional para ayudar a reconstruir edificaciones de la Iglesia en Guapi afectadas tras el atentado",
        enlace: "https://www.cec.org.co/sistema-informativo/actualidad/obispos-colombianos-convocan-colecta-nacional-para-ayudar",
      },
      {
        fecha: "2024-11-23",
        titular:
          "Emergencia invernal y paro armado en el Chocó: Obispos de Istmina-Tadó y de Quibdó piden ayuda urgente para las comunidades",
        enlace: "https://www.cec.org.co/sistema-informativo/actualidad/emergencia-invernal-y-paro-armado-en-el-choco-obispos-de-istmina",
      },
      {
        fecha: "2024-11-24",
        titular:
          "Obispos colombianos convocan la solidaridad de todos los fieles y entidades para ayudar a los damnificados por la ola invernal",
        enlace: "https://www.cec.org.co/sistema-informativo/actualidad/obispos-colombianos-convocan-la-solidaridad-de-todos-los-fieles-y",
      },
      {
        fecha: "2024-11-26",
        titular:
          "Delegación de la Iglesia colombiana está lista para participar en el Sexto Congreso Americano Misionero que se celebrará en Puerto Rico",
        enlace: "https://www.cec.org.co/sistema-informativo/actualidad/delegacion-de-la-iglesia-colombiana-esta-lista-para-participar-en-el",
      },
      {
        fecha: "2024-11-28",
        titular:
          "Boletín Litúrgico 88: todo sobre el Congreso Mariano en Ipiales y el Leccionario para las Misas de los Santos aprobado por la Santa Sede",
        enlace: "https://www.cec.org.co/sistema-informativo/actualidad/boletin-liturgico-88-todo-sobre-el-congreso-mariano-en-ipiales-y-el",
      },
    ],
    noticias_derecha: [
      {
        fecha: "2024-11-11",
        titular:
          "La Diócesis de Coatzacoalcos se integra a Ecclesiared para mejorar la gestión parroquial de sus parroquias",
        enlace: "https://www.ecclesiared.es/la-diocesis-de-coatzacoalcos-se-integra-a-ecclesiared-para-mejorar-la-gestion-parroquial-de-sus-parroquias/?utm_source=rss&#038;utm_medium=rss&#038;utm_campaign=la-diocesis-de-coatzacoalcos-se-integra-a-ecclesiared-para-mejorar-la-gestion-parroquial-de-sus-parroquias",
      },
      {
        fecha: "2024-11-11",
        titular:
          "La parroquia Nuestra Señora de Montserrat de Picanya salva su archivo parroquial de la DANA gracias a Ecclesiared",
        enlace: "https://www.ecclesiared.es/la-parroquia-nuestra-senora-de-montserrat-de-picanya-salva-su-archivo-parroquial-de-la-dana-gracias-a-ecclesiared/?utm_source=rss&#038;utm_medium=rss&#038;utm_campaign=la-parroquia-nuestra-senora-de-montserrat-de-picanya-salva-su-archivo-parroquial-de-la-dana-gracias-a-ecclesiared",
      },
      {
        fecha: "2024-11-11",
        titular:
          "La Prelatura de Illapel implementa Ecclesiared para modernizar su gestión parroquial",
        enlace: "https://www.ecclesiared.es/la-prelatura-de-illapel-implementa-ecclesiared-para-modernizar-su-gestion-parroquial/?utm_source=rss&#038;utm_medium=rss&#038;utm_campaign=la-prelatura-de-illapel-implementa-ecclesiared-para-modernizar-su-gestion-parroquial",
      },
      {
        fecha: "2024-10-15",
        titular:
          "Ventajas de contar con un software parroquial en situaciones de emergencia como huracanes o incendios",
        enlace: "https://www.ecclesiared.es/ventajas-de-contar-con-un-software-parroquial-en-situaciones-de-emergencia-como-huracanes-o-incendios/?utm_source=rss&#038;utm_medium=rss&#038;utm_campaign=ventajas-de-contar-con-un-software-parroquial-en-situaciones-de-emergencia-como-huracanes-o-incendios",
      },
      {
        fecha: "2024-10-10",
        titular:
          "La Diócesis de Ciudad de Altamirano digitaliza sus parroquias con Ecclesiared",
        enlace: "https://www.ecclesiared.es/la-diocesis-de-ciudad-de-altamirano-tambien-se-digitaliza-con-ecclesiared/?utm_source=rss&#038;utm_medium=rss&#038;utm_campaign=la-diocesis-de-ciudad-de-altamirano-tambien-se-digitaliza-con-ecclesiared",
      },
    ],
  };
  return data; // Devuelve el JSON directamente
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
