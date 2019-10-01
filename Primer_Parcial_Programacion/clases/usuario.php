<?php

  class Usuario     
  {
    public $legajo;
    public $nombre;
    public $email;
    public $clave;
    public $fotoUno;
    public $fotoDos;

    public function __construct($legajo, $nombre ,$email, $clave, $fotoUno, $fotoDos )
    {
        $this->legajo = $legajo;
        $this->nombre = $nombre;
        $this->email = $email;
        $this->clave = $clave;
        $this->fotoUno = $fotoUno;
        $this->fotoDos = $fotoDos;
    }
  }

 ?>
