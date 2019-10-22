<?php

  class Log     
  {
    public $ruta;
    public $metodo;
    public $hora;

    public function __construct($ruta, $metodo, $timestamp)
    {
        $this->ruta = $ruta;
        $this->metodo = $metodo;
        $this->hora = $timestamp;
    }
  }

 ?>
