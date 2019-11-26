<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Models\ORM\usuario;
use App\Models\ORM\egreso;
use App\Models\ORM\ingreso;
use App\Models\ORM\Log;
use App\Models\ORM\usuarioController;
use App\Models\ORM\loginController;
use App\Models\Middleware;

include_once __DIR__ . '/../../src/app/modelORM/user.php';
include_once __DIR__ . '/../../src/app/modelORM/ingreso.php';
include_once __DIR__ . '/../../src/app/modelORM/egreso.php';
include_once __DIR__ . '/../../src/app/modelORM/usuarioController.php';
include_once __DIR__ . '/../../src/app/modelORM/loginController.php';
include_once __DIR__ . '/../../src/app/modelAPI/Registros.php';
include_once __DIR__ . '/../../src/app/modelORM/Log.php';
include_once __DIR__ . '/../../src/app/modelAPI/DAO.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->group('/users', function () {
        $this->get('/',usuarioController::class . ':TraerTodos');
        $this->post('/',usuarioController::class . ':CargarUno');
    })->add(Middleware::class . ':Registro');

    $app->group('/login', function () {
        $this->post('/',loginController::class . ':Login');
    })->add(Middleware::class . ':Registro');  

    $app->group('/ingreso', function () {
        $this->put('/',loginController::class . ':IngresoUsuario');
        $this->get('/',loginController::class . ':Ingresos');
        $this->get('/admin/',loginController::class . ':TodosLosIngresos');
    })->add(loginController::class . ':ValidarToken')->add(Middleware::class . ':Registro');

    $app->group('/egreso', function () {
        $this->put('/',loginController::class . ':EgresoUsuario');
    })->add(loginController::class . ':ValidarToken')->add(Middleware::class . ':Registro');
};
