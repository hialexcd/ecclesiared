<?php
// URL del endpoint
$url = "https://app.nativenotify.com/api/notification";

// Datos que se enviarán en el cuerpo de la solicitud
$data = [
    //"subID" => 'demostracion',  // El ID de usuario  , si no va es para todos
    "appId" => 26947, //las llaves API
    "appToken" => "X2IskvSUeT1DcANCxJuZDD",
    "title" => "Mensaje personalizado push para user demostracion", // Cambia este valor por tu título
    "body" => "Push message here as a string", // Cambia este valor por tu mensaje
    "dateSent" => date("n-j-Y g:iA") // Fecha actual en el formato requerido
];

// Inicializa cURL
$ch = curl_init();

// Configuración de cURL
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); // Convierte los datos a JSON

// Ejecuta la solicitud
$response = curl_exec($ch);

// Manejo de errores
if (curl_errno($ch)) {
    echo "Error: " . curl_error($ch);
} else {
    echo "Respuesta del servidor: " . $response;
}

// Cierra la conexión cURL
curl_close($ch);
?>