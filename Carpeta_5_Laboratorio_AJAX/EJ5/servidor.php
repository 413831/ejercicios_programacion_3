<?php
$nombre = $_GET["nombre"];
$apellido = $_GET["apellido"];

if(empty($nombre) || empty($apellido)){
    echo "Sarasa sasa";
}
else
{
    echo "Nombre:".$nombre." ".$apellido;
}


?>