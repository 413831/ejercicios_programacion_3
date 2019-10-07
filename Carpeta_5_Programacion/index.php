<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once './vendor/autoload.php';
$config ['displayErrorDetails'] = true;
$config ['addContentLengthHeader'] = false;
$app = new \Slim\App(["settings" => $config]);

$app->get('/', function ($request,  $response, $args) {
    $response->getBody()->write("<h1>PHP lenguaje ..</h1>");
    return $response;
});

$app -> run();
?>
