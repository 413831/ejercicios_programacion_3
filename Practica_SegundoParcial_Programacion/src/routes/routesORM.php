<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Models\ORM\usuario;
use App\Models\ORM\materia;
use App\Models\ORM\usuarioController;
use App\Models\ORM\materiaController;
use App\Models\PDO\AccesoDatos;

include_once __DIR__ . '/../../src/app/modelORM/usuario.php';
include_once __DIR__ . '/../../src/app/modelORM/usuarioController.php';
include_once __DIR__ . '/../../src/app/modelORM/materia.php';
include_once __DIR__ . '/../../src/app/modelORM/materiaController.php';


return function (App $app) {
    $container = $app->getContainer();

    $app->group('/usuarios', function () {
         //$this->get('/',cdControler::class . ':TraerTodos');
        $this->post('/login/',usuarioController::class . ':Login');

        $this->get('/',usuarioController::class . ':TraerTodos')->add(usuarioController::class . ':ValidarRol');
        $this->get('/{id}',usuarioController::class . ':TraerUno')->add(usuarioController::class . ':ValidarRol');
        $this->post('/',usuarioController::class . ':CargarUno')->add(usuarioController::class . ':ValidarRol');
        $this->post('/baja',usuarioController::class . ':BorrarUno')->add(usuarioController::class . ':ValidarRol');
        $this->post('/{legajo}',usuarioController::class . ':ModificarUno')->add(usuarioController::class . ':ValidarRol');
    });

    $app->group('/materias', function(){
        $this->post('/',materiaController::class . ':CargarUno')->add(usuarioController::class . ':ValidarRol');
        $this->post('/{materia}',materiaController::class.':InscripcionMateria')->add(usuarioController::class.':ValidarRol');
        $this->get('/',materiaController::class.':TraerTodos')->add(usuarioController::class.':ValidarRol');        
    });
};
