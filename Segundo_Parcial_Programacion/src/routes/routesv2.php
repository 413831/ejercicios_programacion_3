<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;



include_once __DIR__ . '/../src/app/clasesPDO/AccesoDatos.php';
include_once __DIR__ . '/../src/app/clasesPDO/cd.php';


return function (App $app) {
    $container = $app->getContainer();

		
/*LLAMADA A METODOS DE INSTANCIA DE UNA CLASE*/
$app->group('/cd', function () {   

        $this->get('/',\cd::class . ':traerTodos');
        

     
});



};
