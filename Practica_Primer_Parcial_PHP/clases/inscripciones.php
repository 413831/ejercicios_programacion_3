<?php
 class Inscripcion
 {
   public $nombreAlumno;
   public $apellidoAlumno;
   public $emailAlumno;
   public $codigoMateria;

   public function __construct($nombreAlumno, $apellidoAlumno, $emailAlumno, $codigoMateria)
   {
     $this->nombreAlumno = $nombreAlumno;
     $this->apellidoAlumno = $apellidoAlumno;
     $this->emailAlumno = $emailAlumno;
     $this->codigoMateria = $codigoMateria;
   }
 }



 ?>
