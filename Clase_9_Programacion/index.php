<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once './vendor/autoload.php';
require_once './clases/cdApi.php';
require_once './clases/middleware.php';
$config ['displayErrorDetails'] = true;
$config ['addContentLengthHeader'] = false;
$app = new \Slim\App(["settings" => $config]);

$middleware = function($request, $response, $next){
    $response->getbody()->write("</br>Middleware 1");
    $ruta = "</br>".$request->getRequestTarget();
    $metodo = "</br>".$request->getMethod();
    $hora = getdate();
    $timestamp = "</br>Hora:".$hora["hours"].":".$hora["minutes"].":".$hora["seconds"];
    $mensaje = "</br></br>LOG:".$ruta.$metodo.$timestamp;
    
    $response = $next($request,$response);
    $response->getbody()->write("</br>Middleware 1");
    $response->getbody()->write($mensaje);
    
    return $response;
};

$middleware2 = function($request, $response, $next){    
    $response->getbody()->write("</br>Middleware 2");
    $response->getbody()->write("</br>Entrada ");
    $response = $next($request,$response);
    $response->getbody()->write("</br>Salida ");
    $response->getbody()->write("</br>Middleware 2");

    return $response;
};
    
$app->group('/api', function() use ($app) {
    $this->post('/', cdApi::class . ':funcionPost'); // Se agregan las funciones middleware a todo el grupo
    $this->get('/', cdApi::class . ':funcionGet');
})->add(Middleware::class . ':middleware2')->add(Middleware::class . ':middleware1');

$app -> run();




?>