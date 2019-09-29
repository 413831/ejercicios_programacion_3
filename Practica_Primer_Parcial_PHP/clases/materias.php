<?php

class Materia
{
  public $nombre;
  public $codigo;
  public $cupo;
  public $aula;

  public function __construct($nombre,$codigo,$cupoAlumnos,$aula)
  {
    $this->nombre = $nombre;
    $this->codigo = $codigo;
    $this->cupo = $cupoAlumnos;
    $this->aula = $aula;
  }
}

 ?>
