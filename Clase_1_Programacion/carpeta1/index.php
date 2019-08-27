<?php
// include 'funciones.php';
// require 'Clases/personas.php';'funciones.php'; Busca un archivo y si no lo encuentra sigue la ejecucion
// require once 'funciones.php'; Busca solo una vez un archivo
include 'funciones.php';
include './Clases/Persona.php';
include './Clases/Alumno.php';

echo "Hola Mundo";

saludar("Pepe");

$alumno = new Alumno("Pepito",44123123,28,"Benavidez",5555,"Primero");
$alumno->saludar();

?>

