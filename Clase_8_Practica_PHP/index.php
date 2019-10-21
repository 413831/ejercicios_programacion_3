<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once './vendor/autoload.php';
require_once './clases/alumno.php';
require_once './clases/materia.php';
require_once './clases/inscripcion.php';
require_once './clases/genericDao.php';
require_once './clases/controller.php';
require_once './clases/cdApi.php';
$config ['displayErrorDetails'] = true;
$config ['addContentLengthHeader'] = false;
$app = new \Slim\App(["settings" => $config]);
// $app->get('/hello', function ($request,  $response, $args) {
//     $response->getBody()->write("Hello, World");
//     return $response;
$app->group('/api', function() use ($app) {
    //$this->get('/{case}'), cdApi::class . ':controllerGet'); OPCION B
    //$this->post('/'), cdApi::class . ':controllerPost'); OPCION B

    $app->group('/alumno', function(){
        $this->post('/', cdApi::class . ':altaAlumno');
        $this->get('/{apellido}', cdApi::class . ':consultarAlumno');
        $this->get('/', cdApi::class . ':alumnos');
        $this->post("/update/", cdApi::class . ':modificarAlumno');
        $this->delete('/', cdApi::class . ':bajaAlumno');
    });

    $app->group('/materia', function (){
        $this->post('/', cdApi::class . ':altaMateria');
        $this->get('/', cdApi::class . ':materias');

    });

    $app->group('/inscripcion', function (){
        $this->get('/', cdApi::class . ':altaInscripcion');

    });

});
$app -> run();
