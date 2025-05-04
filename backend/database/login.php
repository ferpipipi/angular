<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: Content-Type');

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"));
file_put_contents('php://stderr', print_r($data, TRUE)); 

$email = $data->email ?? '';
$password = $data->password ?? '';

if($email == '' || $password == '') {
    echo json_encode(array("status" => "error", "message" => "Email and password are required."));
    exit;
}

$consulta = $conexion ->prepare("SELECT * FROM usuarios WHERE email = ? AND password = ?");
$consulta -> bind_param("ss", $email, $password);
$consulta -> execute();
$resultado = $consulta -> get_result();

if($resultado -> num_rows > 0) {
    $usuario = $resultado -> fetch_assoc();
    echo json_encode(array("status" => "success", "message" => "Login successful.", "user" => $usuario));
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid email or password."));
}