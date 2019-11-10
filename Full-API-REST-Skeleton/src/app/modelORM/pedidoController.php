<?php
namespace App\Models\ORM;
use App\Models\ORM\usuario;
use App\Models\IApiControler;

include_once __DIR__ . '/usuario.php';
include_once __DIR__ . '../../modelAPI/IApiControler.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class pedidoController implements IApiControler
{
 	public function Beinvenida($request, $response, $args) {
      $response->getBody()->write("GET => Bienvenido!!! ,a UTN FRA SlimFramework");

    return $response;
    }

     public function TraerTodos($request, $response, $args) {
       	//return cd::all()->toJson();
        $pedidos = pedido::all();
        $newResponse = $response->withJson($pedidos, 200);
        return $newResponse;
    }
    public function TraerUno($request, $response, $args) {
     	//complete el codigo
      $id = $args['id'];
      $pedido = Usuario::find($id);
     	$newResponse = $response->withJson($pedido, 200);
    	return $newResponse;
    }

      public function CargarUno($request, $response, $args) {
     	 //complete el codigo
       $parametros = $request->getParsedBody();
       $pedido = new Pedido;
       $pedido->nombre = $parametros['nombre'];
       $usuario->clave = $parametros['clave'];
       $usuario->rol = $parametros['rol'];
       $usuario->save();
       // Implementar TOKEN

     	 $newResponse = $response->withJson("sin completar", 200);
        return $response;
    }
      public function BorrarUno($request, $response, $args) {
  		//complete el codigo
     	$newResponse = $response->withJson("sin completar", 200);
      	return $newResponse;
    }

     public function ModificarUno($request, $response, $args) {
     	//complete el codigo
     	$newResponse = $response->withJson("sin completar", 200);
		return 	$newResponse;
    }



}
