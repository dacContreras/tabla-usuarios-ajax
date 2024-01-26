<!-- INFORMACION DE LA BASE DE DATOS -->
<!-- 
    uf8_general_ci
    nombre de la base datos: curso_php_ajax
    nombre de la tabla: usuarios
    nombre de la columna 1: id INT AUTO_INCREMENT PRIMARY
    nombre de la columna 2: nombre varchar(150)
    nombre de la columna 3: edad int (3)
    nombre de la columna 4: país varchar (150)
    nombre de la columna 5: correo varchar (150)
 -->
<?php

// si no queremo un error no lo muestra
error_reporting(0);

// esta linea nos permite decirle qu es una archivo JSON
header('Content-type: application/json; charset=utf-8');

// recibimos los valores
$nombre = $_POST['nombre'];
$edad = $_POST['edad'];
$pais = $_POST['pais'];
$correo = $_POST['correo'];

// validamos los valores
function validarDatos($nombre, $edad, $pais, $correo)
{
    if ($nombre == '') {
        return false;
    } elseif ($edad == '' || is_int($edad)) {
        return false;
    } elseif ($pais == '') {
        return false;
    } elseif ($correo == '') {
        return false;
    }
    return true;
}

// si los datos fueron validados (true) haremos:
if (validarDatos($nombre, $edad, $pais, $correo)) {
    // hacemos la conexion a la base de datos
    $conexion = new mysqli('localhost', 'root', '', 'curso_php_ajax');
    // agregamos a la conexion que sea utf para caracteres especiales
    $conexion->set_charset('utf8');

    // si la conexion falla entonces agregamos un error a la respuesta
    if ($conexion->connect_errno) {
        $respuesta = ['error' => true];
    // si la conexion es correcta entonces:
    } else {
        // preparamos la consulta sql 
        $statement = $conexion->prepare("INSERT INTO usuarios(nombre, edad, pais, correo) VALUES(?,?,?,?)");
        // ponemos los valores que queresmos agregar
        $statement->bind_param("siss", $nombre, $edad, $pais, $correo);
        // ejecutamos la consulta
        $statement->execute();

        // si no agregamos ninguna fila entonces mostramos un error
        if ($conexion->affected_rows <= 0) {
            $respuesta = ['error' => true];
        }

        $respuesta = [];
    }
// si no son validos la respuesta sera un error
} else {
    $respuesta = ['error' => true];
}

// archivo json con la respueta que tengamos
echo json_encode($respuesta);
