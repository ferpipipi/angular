<?php

$host = "localhost";
$user = "root";
$password = "";
$db = "peliculas";

$conexion = new mysqli($host, $user, $password, $db);

if ($conexion ->connect_error) {
    die("Connection failed: " . $conexion->connect_error);
} else {
    // echo "Conexión exitosa a la base de datos";
}

?>