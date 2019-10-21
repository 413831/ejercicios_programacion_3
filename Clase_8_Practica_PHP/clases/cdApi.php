<?php
class cdApi
{
    public $alumnos;

    public function __construct()
    {
        $this->alumnos = "./alumnos.txt";
        $this->materias = "./materias.txt";
        $this->inscripciones = "./inscripciones.txt";
    }

    // Mostrar los datos de un solo alumno en una tabla
    public function consultarAlumno($request, $response, $args){
        $apellido = $args['apellido'];
        $alumno = Controller::mostrarAlumno($apellido,$this->alumnos);
        return $response->getbody()->write($alumno);
    }

    // Alta de un alumno, se guarda en un archivo txt como JSON
    public function altaAlumno($request, $response, $args){
        $archivos = $request->getUploadedFiles();
        $parametros = $request->getParsedBody();
        $nombre = $parametros['nombre'];
        $apellido = $parametros['apellido'];
        $email = $parametros['email'];
        $foto = $archivos["foto"];

        $respuesta = Controller::cargarAlumno($nombre, $apellido, $email, $foto,$this->alumnos);
        return $response->getbody()->write($respuesta);
    }

    // Modificacion de un alumno, se levanta del archivo txt
    public function modificarAlumno($request, $response, $args){
        $archivos = $request->getUploadedFiles();
        $parametros = $request->getParsedBody();
        var_dump($parametros);

        $respuesta = Controller::modificarAlumno($archivos,$parametros,$this->alumnos);
        return $response->getbody()->write($respuesta);
    }

    // Baja física de un alumno, se levanta del archivo txt
    public function bajaAlumno($request, $response, $args){
        $parametros = $request->getParsedBody();
        $respuesta = Controller::borrarAlumno($parametros,$this->alumnos);
        return $response->getbody()->write($respuesta);
    }

    // Mostrar a todos los alumnos en una tabla
    public function alumnos($request, $response, $args){
        $alumnos = Controller::mostrarAlumnos($this->alumnos);
        return $response->getbody()->write($alumnos);
    }

    // Alta de una materia, se guarda en archivo txt como JSON
    public function altaMateria($request, $response, $args){
        $parametros = $request->getParsedBody();
        $nombre = $parametros['nombre'];
        $codigo  = $parametros['codigo'];
        $cupo = $parametros['cupo'];
        $aula = $parametros['aula'];

        $respuesta = Controller::cargarMateria($nombre, $codigo, $cupo,$aula,$this->materias);
        return $response->getbody()->write($respuesta);
    }

    // Mostrar a todas las materias
    public function materias($request, $response, $args){
        $materias = Controller::mostrarMaterias($this->materias);
        return $response->getbody()->write($materias);
    }

    public function altaInscripcion($request, $response, $args){
        $parametros = $request->getQueryParams();
        $nombreAlumno = $parametros['nombreAlumno'];
        $apellido  = $parametros['apellido'];
        $email = $parametros['email'];
        $materia = $parametros['materia'];
        $codigo = $parametros['codigo'];

        $respuesta = Controller::inscribirAlumno($nombreAlumno, $apellido, $email, $materia,
                                                    $materias, $alumnos, $inscripciones);
        return $response->getbody()->write($respuesta);
    }

    public function controllerGet($request, $response, $args)
    {
        $case = $args['case'];

        switch ($case)
         {
            case 'consultarAlumno':
                return consultarAlumno($request, $response, $args);
                break;
            case 'inscribirAlumno':
                    // code...
                    break;
            case 'inscripciones':
                        // code...
                    break;
            case 'alumnos':
                return alumnos($request, $response, $args);
                break;

            default:
                echo json_encode(array('mensaje' => 'Opcion incorrecta. Verifique el case.'));
                break;
        }
    }

    public function controllerPost($request, $response, $args)
    {
        $parametros = $request->getParsedBody();
        $case = $parametros['case'];

        switch ($case)
         {
            case 'cargarAlumno':
                return altaAlumno($request, $response, $args);
                break;
            case 'cargarMateria':
                return altaMateria($request, $response, $args);
                break;
            case 'modificarAlumno':
                return modificarAlumno($request, $response, $args);
                break;
            default:
                echo json_encode(array('mensaje' => 'Opcion incorrecta. Verifique el case.'));
                break;
        }
    }

}
