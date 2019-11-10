<?php

use \Firebase\JWT\JWT;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once './vendor/autoload.php';
require_once './clases/usuario.php';
require_once './clases/log.php';
require_once './clases/genericDao.php';
require_once './clases/api.php';
require_once './clases/middleware.php';
$config ['displayErrorDetails'] = true;
$config ['addContentLengthHeader'] = false;
$app = new \Slim\App(["settings" => $config]);

$key = "example_key";
$token = array(
    "iss" => "http://example.org",
    "aud" => "http://example.com",
    "iat" => 1356999524,
    "nbf" => 1357000000
);
$jwt = JWT::encode($token, $key);
$decoded = JWT::decode($jwt, $key, array('HS256'));

$app->group('/login', function() use ($app){
    $this->post('/signup/', api::class . ':altaUsuario')->add(Middleware::class . ':middleware3');
    $this->post('/', api::class . ':loginUsuario')->add(Middleware::class . ':middleware3');
});

$app->group('/api', function() use ($app) {
    $this->post('/', api::class . ':funcionPost'); // Se agregan las funciones middleware a todo el grupo
    $this->get('/', api::class . ':funcionGet');
})->add(Middleware::class . ':middleware2')->add(Middleware::class . ':middleware1');

$app -> run();




?>
