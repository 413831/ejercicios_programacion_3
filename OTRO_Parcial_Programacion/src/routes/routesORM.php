<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Models\ORM\usuario;
use App\Models\ORM\usuarioController;

include_once __DIR__ . '/../../src/app/modelORM/usuario.php';
include_once __DIR__ . '/../../src/app/modelORM/usuarioController.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->group('/usuarios', function () {
         //$this->get('/',cdControler::class . ':TraerTodos');
        $this->get('/',usuarioController::class . ':TraerTodos');
        $this->get('/{id}',usuarioController::class . ':TraerUno');
        $this->post('/',usuarioController::class . ':CargarUno');
        $this->post('/baja',usuarioController::class . ':BorrarUno');
        $this->post('/{id}',usuarioController::class . ':ModificarUno');
    });
}->(Middleware::class . ':Registro');
