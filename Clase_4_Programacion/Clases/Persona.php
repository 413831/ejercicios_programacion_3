<?php
    class Persona
    {
        public $nombre;
        public $apellido;
        public $legajo;
        public function __construct($nombre, $apellido, $legajo)
        {
            $this->nombre = $nombre;
            $this->apellido = $apellido;
            $this->legajo = $legajo;
        }
        public function saludar()
        {
             echo 'Hola, '.$this->nombre.' '.$this->apellido.' '.$this->legajo;
        }
    }
?>
