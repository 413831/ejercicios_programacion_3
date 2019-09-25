<?php
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];

if(empty($nombre) || empty($apellido)){
    echo "Sarasa sasa";
}
else
{
    echo "Nombre:".$nombre." ".$apellido;
}


?>