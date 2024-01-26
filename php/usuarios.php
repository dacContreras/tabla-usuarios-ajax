<?php

// esta linea nos permite decirle qu es una archivo JSON
header('Content-type: aplication/json; charset=utf-8');

// esto es lo que queremos devolveer en pantalla
$respuesta = [
    [
        'id' => 'j23aj3647djad2j42v223',
        'nombre' => 'Carlos',
        'edad' => 23,
        'pais' => 'mexico',
        'correo' => 'correo@gmail.com'
    ],
    [
        'id' => 'j23aj3647djad2j42v223',
        'nombre' => 'Carlitos',
        'edad' => 25,
        'pais' => 'mexsico',
        'correo' => 'correo@sgmail.com'
    ],
];

// permite pasar esta estructura a un archivo JSON
echo json_encode($respuesta);