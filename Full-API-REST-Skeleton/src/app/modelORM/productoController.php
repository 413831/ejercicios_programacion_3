<?php
namespace App\Models\ORM;
use App\Models\ORM\producto;
use App\Models\IApiControler;

include_once __DIR__ . '/producto.php';
include_once __DIR__ . '../../modelAPI/IApiControler.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class productoController implements IApiControler
{
 	public function Beinvenida($request, $response, $args) {
      $response->getBody()->write("GET => Bienvenido!!! ,a UTN FRA SlimFramework");

    return $response;
    }

     public function TraerTodos($request, $response, $args) {
       	//return cd::all()->toJson();
        $productos =producto::all();
        $newResponse = $response->withJson($productos, 200);
        return $newResponse;
    }
    public function TraerUno($request, $response, $args) {
     	//complete el codigo
      $id = $args['id'];
      $producto = Producto::find($id);
     	$newResponse = $response->withJson($producto, 200);
    	return $newResponse;
    }

      public function CargarUno($request, $response, $args) {
     	 //complete el codigo
       $parametros = $request->getParsedBody();
       $producto = new Producto;
       $producto->descripcion = $parametros['descripcion'];
       $producto->precio = $parametros['precio'];
       $producto->tipo = $parametros['tipo'];
       $producto->save();
       // Implementar TOKEN

     	 $newResponse = $response->withJson("sin completar", 200);
        return $response;
    }

      public function BorrarUno($request, $response, $args) {
    		//complete el codigo
        $parametros = $request->getParsedBody();
        $id = $parametros['id'];
        $producto = Producto::find($id);
        $producto->delete();
        $newResponse = $response->withJson('Producto '.$id.' borrado', 200);
        return $newResponse;
      }

      public function ModificarUno($request, $response, $args) {
       	//Validar cada parametro
        $parametros = $request->getParsedBody();
        $id = $args['id'];
        $producto = Producto::find($id);
        $producto->descripcion = $parametros['descripcion'];
        $producto->precio = $parametros['precio'];
        $producto->tipo = $parametros['tipo'];
        $usuario->save();
        $newResponse = $response->withJson('Producto '.$id.' modificado', 200);
        return $newResponse;
      }


}
