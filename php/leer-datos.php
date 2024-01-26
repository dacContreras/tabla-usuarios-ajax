<?php
// esta linea nos permite decirle qu es una archivo JSON
error_reporting(0);

// esta linea nos permite decirle qu es una archivo JSON
header('Content-type: aplication/json; charset=utf-8');

// conexion a la base datos
$conexion = new mysqli('localhost', 'root', '', 'curso_php_ajax');

// si falla la conexion le devolvemos el error
if ($conexion->connect_errno) {
    $respuesta = [
        'error' => true
    ];
// hacemos nuestra conexion
} else {
    // queremos trabajar con utf8 para caracteres (tildes o ñ)
    $conexion->set_charset("utf8");
    // preparamos una consulta sql
    $statement = $conexion->prepare("SELECT * FROM usuarios");
    // Ejecutamos nuestra consulta
    $statement->execute();
    // guardamos los resultados
    $resultados = $statement->get_result();

    // en la respuesta mandamos toda la informain del usuario
    $respuesta = [];

    // hacemos un ciclo por toda la informacion
    // que traemos de la base de datos
    while ($fila = $resultados->fetch_assoc()) {
        $usuario = [
            'id'        => $fila['ID'],
            'nombre'    => $fila['nombre'],
            'edad'      => $fila['edad'],
            'pais'      => $fila['pais'],
            'correo'    => $fila['correo']
        ];
        // agregamos al array los datos
        array_push($respuesta, $usuario);
    }
}

echo json_encode($respuesta);
