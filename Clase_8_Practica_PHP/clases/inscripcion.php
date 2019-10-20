<?php
class Inscripcion
{
    public $nombreAlumno;
    public $apellidoAlumno;
    public $email;
    public $nombreMateria;
    public $codigo;

    public function __construct($nombreAlumno, $apellidoAlumno, $email,
                                    $materia, $codigo)
    {
        $this->nombreAlumno = $nombreAlumno;
        $this->apellidoAlumno = $apellidoAlumno;
        $this->email = $email;
        $this->nombreMateria = $materia;
        $this->codigo = $codigo;
    }
}
