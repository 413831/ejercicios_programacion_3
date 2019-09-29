<?php

class Materia
{
  public $nombre;
  public $codigo;
  public $cupoAlumnos;
  public $aula;

  public function __construct($nombre,$codigo,$cupoAlumnos,$aula)
  {
    $this->nombre = $nombre;
    $this->codigo = $codigo;
    $this->cupoAlumnos = $cupoAlumnos;
    $this->aula = $aula;
  }
}

 ?>
