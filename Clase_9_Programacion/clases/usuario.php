<?php
  class Usuario extends Model
  {
    $nombre;
    $clave;
    $status;

    public function __construct($nombre, $clave)
    {
      $this->nombre = $nombre;
      $this->clave = $clave;
      $this->status = "activo";
      // Setear tabla para usuarios
      protected $table = 'usuarios';
    }
  }

 ?>
