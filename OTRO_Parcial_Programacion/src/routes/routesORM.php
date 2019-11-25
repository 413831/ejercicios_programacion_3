<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Models\ORM\usuario;
use App\Models\ORM\usuarioController;
use App\Models\ORM\loginController;
use App\Models\Middleware;
use App\Models\Log;

include_once __DIR__ . '/../../src/app/modelORM/usuario.php';
include_once __DIR__ . '/../../src/app/modelORM/usuarioController.php';
include_once __DIR__ . '/../../src/app/modelORM/loginController.php';
include_once __DIR__ . '/../../src/app/modelAPI/Registros.php';
include_once __DIR__ . '/../../src/app/modelAPI/Log.php';
include_once __DIR__ . '/../../src/app/modelAPI/DAO.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->group('/users', function () {
         //$this->get('/',cdControler::class . ':TraerTodos');
        $this->get('/',usuarioController::class . ':TraerTodos');
        $this->get('/{id}',usuarioController::class . ':TraerUno');
        $this->post('/',usuarioController::class . ':CargarUno');
        $this->post('/baja',usuarioController::class . ':BorrarUno');
        $this->post('/{id}',usuarioController::class . ':ModificarUno');
    })->add(Middleware::class . ':Registro');

    $app->group('/login', function () {
        $this->post('/',loginController::class . ':Login');
    })->add(Middleware::class . ':Registro');

    $app->group('/ingreso', function () {
        $this->post('/',loginController::class . ':IngresoUsuario');
    })->add(loginController::class . ':ValidarToken')->add(Middleware::class . ':Registro');

    $app->group('/egreso', function () {
        $this->post('/',loginController::class . ':EgresoUsuario');

    })->add(loginController::class . ':ValidarToken')->add(Middleware::class . ':Registro');
};
