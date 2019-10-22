<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once './vendor/autoload.php';
require_once './clases/pizzas.php';
require_once './clases/venta.php';
require_once './clases/log.php';
require_once './clases/genericDao.php';
require_once './clases/controller.php';
require_once './clases/cdApi.php';
$config ['displayErrorDetails'] = true;
$config ['addContentLengthHeader'] = false;
$app = new \Slim\App(["settings" => $config]);

$app->group('/api', function() use ($app) {
    
   $app->group('/pizzas', function() {
       $this->post('/', cdApi::class . ':guardarPizza');
       $this->get('/', cdApi::class . ':mostrarPizzas');       
       $this->post('/update/', cdApi::class . ':modificarPizza');
   });

   $app->group('/ventas', function(){
    $this->post('/', cdApi::class . ':guardarVenta');
    });

});
$app -> run();
