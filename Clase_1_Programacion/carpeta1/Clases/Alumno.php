<?php
require_once 'Persona.php';

class Alumno extends Persona
{    
    // Atributos
    public $legajo;
    public $cuatrimestre;
    
    // Constructor
    public function __construct($nombre, $dni, $edad, $localidad,$legajo,$cuatrimestre)  
    {
       // parent:: __construct($nombre, $dni, $edad, $localidad);
       $this->nombre = $nombre;
        $this->dni = $dni;
        $this->edad = $edad;
        $this->localidad = $localidad; 
       $this->legajo = $legajo;
        $this->cuatrimestre = $cuatrimestre;
    }

    public function saludar()
    {
        echo "<br/>Hola:", $this->nombre;
    }

    public function mostrarInfo()
    {
//$datos = "Legajo: ".$this->legajo;
     //   $datos.= "Cuatrimestre".$this->cuatrimestre;
       // return parent::mostrarInfo()." ".$datos; 
    }
}


?>
