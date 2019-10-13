<?php
class cdApi
{
    public $alumnoController;
    public function __construct()
    {
        $this->alumnoController = new AlumnoController();
    }
    public function traerTodos($request, $response, $args){
        $alumnos = $this->alumnoController->mostrarAlumnos();
        return $response->getbody()->write($alumnos);
    }

    public function traerUno($request, $response, $args){
        $apellido = $args['apellido'];
        $alumno = $this->alumnoController->consultarAlumno($apellido);
        return $response->getbody()->write(json_encode($alumno));
    }
    public function cargarUno($request, $response, $args){
        $archivos = $request->getUploadedFiles();
        $parametros = $request->getParsedBody();
        $nombre = $parametros['nombre'];
        $apellido = $parametros['apellido'];
        $email = $parametros['email'];
        $foto = $archivos["foto"];

        $respuesta = $this->alumnoController->cargarAlumno($nombre, $apellido, $email, $foto);
        return $response->getbody()->write($respuesta);
    }
    public function modificarUno($request, $response, $args){
        $archivos = $request->getUploadedFiles();
        $parametros = $request->getParsedBody();
        var_dump($parametros);

        $respuesta = $this->alumnoController->modificarAlumno($archivos,$parametros);
        return $response->getbody()->write($respuesta);
    }
    public function borrarUno($request, $response, $args){
        return $response->getbody()->write("Hello world DELETE");
    }
}
