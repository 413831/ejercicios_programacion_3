<?php


class Persona
{    
    // Atributos
    public $nombre;
    public $dni;
    public $edad;
    public $localidad;
    
    // Constructor
    public function __construct($nombre, $dni, $edad, $localidad)
    {
        $this->nombre = $nombre;
        $this->dni = $dni;
        $this->edad = $edad;
        $this->localidad = $localidad;
    }

    public function saludar()
    {
        echo "<br/>Hola:", $this->nombre;
    }

    public function mostrarInfo()
    {
        $info = "<h1>Datos de la persona</h1>";
        $info.= "Nombre: ".$this->nombre;
        $info .= "<br/>Dni: ".$this->dni;
        $info .= "<br/>Edad: ".$this->edad;
        $info .= "<br/>Localidad: ".$this->localidad;

        return $info;
    }
}


?>

