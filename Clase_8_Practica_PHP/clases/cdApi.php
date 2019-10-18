<?php
class cdApi
{
    public $alumnos;

    public function __construct()
    {
        $this->alumnos = "./alumnos.txt";
    }

    public function traerTodos($request, $response, $args){
        $alumnos = Controller::mostrarAlumnos($this->alumnos);
        return $response->getbody()->write($alumnos);
    }

    public function traerUno($request, $response, $args){
        $apellido = $args['apellido'];
        $alumno = Controller::mostrarAlumno($apellido,$this->alumnos);
        return $response->getbody()->write($alumno);
    }

    public function cargarUno($request, $response, $args){
        $archivos = $request->getUploadedFiles();
        $parametros = $request->getParsedBody();
        $nombre = $parametros['nombre'];
        $apellido = $parametros['apellido'];
        $email = $parametros['email'];
        $foto = $archivos["foto"];

        $respuesta = Controller::cargarAlumno($nombre, $apellido, $email, $foto,$this->alumnos);
        return $response->getbody()->write($respuesta);
    }

    public function modificarUno($request, $response, $args){
        $archivos = $request->getUploadedFiles();
        $parametros = $request->getParsedBody();
        var_dump($parametros);

        $respuesta = Controller::modificarAlumno($archivos,$parametros,$this->alumnos);
        return $response->getbody()->write($respuesta);
    }

    public function borrarUno($request, $response, $args){
        $parametros = $request->getParsedBody();


        return $response->getbody()->write("Hello world DELETE");
    }
}
