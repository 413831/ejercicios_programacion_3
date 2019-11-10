<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Models\ORM\cd;
use App\Models\ORM\producto;
use App\Models\ORM\usuario;
use App\Models\ORM\pedido;
use App\Models\ORM\mesa;
use App\Models\ORM\cdControler;
use App\Models\ORM\usuarioController;
use App\Models\ORM\productoController;
use App\Models\ORM\pedidoController;

include_once __DIR__ . '/../../src/app/modelORM/usuario.php';
include_once __DIR__ . '/../../src/app/modelORM/producto.php';
include_once __DIR__ . '/../../src/app/modelORM/pedido.php';
include_once __DIR__ . '/../../src/app/modelORM/mesa.php';
include_once __DIR__ . '/../../src/app/modelORM/producto.php';
include_once __DIR__ . '/../../src/app/modelORM/cd.php';
include_once __DIR__ . '/../../src/app/modelORM/cdControler.php';
include_once __DIR__ . '/../../src/app/modelORM/usuarioController.php';
include_once __DIR__ . '/../../src/app/modelORM/pedidoController.php';
include_once __DIR__ . '/../../src/app/modelORM/productoController.php';

return function (App $app) {
    $container = $app->getContainer();

     $app->group('/cdORM', function () {

        $this->get('/productos', function ($request, $response, $args) {
          //return cd::all()->toJson();
          //$todosLosCds=cd::all();
          $todosLosCds=producto::all();
          $newResponse = $response->withJson($todosLosCds, 200);
          return $newResponse;
        });

        $this->get('/usuarios', function ($request, $response, $args) {
          //return cd::all()->toJson();
          //$todosLosCds=cd::all();
          $todosLosCds=usuario::all();
          $newResponse = $response->withJson($todosLosCds, 200);
          return $newResponse;
        });

        $this->get('/mesas', function ($request, $response, $args) {
          //return cd::all()->toJson();
          //$todosLosCds=cd::all();
          $todosLosCds=mesa::all();
          $newResponse = $response->withJson($todosLosCds, 200);
          return $newResponse;
        });

        $this->get('/pedidos', function ($request, $response, $args) {
          //return cd::all()->toJson();
          //$todosLosCds=cd::all();
          $todosLosCds=pedido::all();
          $newResponse = $response->withJson($todosLosCds, 200);
          return $newResponse;
        });
    });

    $app->group('/usuarios', function () {
         //$this->get('/',cdControler::class . ':TraerTodos');
        $this->get('/',usuarioController::class . ':TraerTodos');
        $this->get('/{id}',usuarioController::class . ':TraerUno');
        $this->post('/',usuarioController::class . ':CargarUno');
        $this->post('/baja',usuarioController::class . ':BorrarUno');
        $this->post('/{id}',usuarioController::class . ':ModificarUno');
    });

    $app->group('/productos', function () {
        //$this->get('/',cdControler::class . ':TraerTodos');
       $this->get('/',productoController::class . ':TraerTodos');
       $this->get('/{id}',productoController::class . ':TraerUno');
       $this->post('/',productoController::class . ':CargarUno');
       $this->post('/baja',productoController::class . ':BorrarUno');
       $this->post('/{id}',productoController::class . ':ModificarUno');
   });

   $app->group('/pedidos', function () {
       //$this->get('/',cdControler::class . ':TraerTodos');
      $this->get('/',pedidoController::class . ':TraerTodos');
      $this->get('/{id}',pedidoController::class . ':TraerUno');
      $this->post('/',pedidoController::class . ':CargarUno');
      $this->post('/baja',pedidoController::class . ':BorrarUno');
      $this->post('/{id}',pedidoController::class . ':ModificarUno');
  });


};
