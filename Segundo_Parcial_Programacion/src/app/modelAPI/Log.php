<?php
namespace App\Models;

class Log
{
  public $ruta;
  public $metodo;
  public $fecha;
  public $ip;
  public $server;
  public $software;
  public function __construct($usuario,$ruta, $metodo, $fecha,$ip, $server, $software)
  {
      $this->usuario = $usuario;
      $this->ruta = $ruta;
      $this->metodo =  $metodo;
      $this->fecha = $fecha;
      $this->ip = $ip;
      $this->server = $server;
      $this->software = $software;
  }
}
 ?>
