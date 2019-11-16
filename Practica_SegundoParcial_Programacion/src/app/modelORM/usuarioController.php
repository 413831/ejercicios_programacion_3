<?php
namespace App\Models\ORM;
use App\Models\ORM\usuario;
use App\Models\IApiControler;
use App\Models\AutentificadorJWT;

include_once __DIR__ . '/usuario.php';
include_once __DIR__ . '../../modelAPI/IApiControler.php';
include_once __DIR__ . '../../modelAPI/AutentificadorJWT.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class usuarioController implements IApiControler
{
 	  public function Beinvenida($request, $response, $args) {
      $response->getBody()->write("GET => Bienvenido!!! ,a UTN FRA SlimFramework");

    return $response;
    }

    public function TraerTodos($request, $response, $args) {
       	//return cd::all()->toJson();
        $rol = $request->getAttribute("rol");
        if($rol == "admin")
        {
            $usuarios=usuario::all();
            $newResponse = $response->withJson($usuarios, 200);

        }
        else {
            $newResponse = "Accion no permitida.";
        }
        return $newResponse;
    }

    public function TraerUno($request, $response, $args) {
     	//complete el codigo
      $id = $args['id'];
      $usuario = Usuario::find($id);
     	$newResponse = $response->withJson($usuario, 200);
    	return $newResponse;
    }

    public function CargarUno($request, $response, $args) {

     $rol = $request->getAttribute("rol");

     if($rol == "admin")
     {
         $parametros = $request->getParsedBody();
         $usuario = new Usuario;
         $usuario->nombre = $parametros['nombre'];
         $usuario->clave = $parametros['clave'];
         $usuario->email = $parametros['email'];
         $usuario->id_tipo = $parametros['tipo'];
         $usuario->legajo = rand(0,10000);
         $usuario->save();

       	 $newResponse = $response->withJson(Usuario::find($usuario->id), 200);
     }
     else {
         $newResponse = "Accion no permitida.";
     }

      return $newResponse;
    }

    public function BorrarUno($request, $response, $args) {
  		//complete el codigo
      $parametros = $request->getParsedBody();
      $id = $parametros['id'];
      $usuario = Usuario::find($id);
      $usuario->delete();
      $newResponse = $response->withJson('Usuario '.$id.' borrado', 200);
      return $newResponse;
    }

    public function ModificarUno($request, $response, $args) {
     	//complete el codigo
        $parametros = $request->getParsedBody();
        $rol = $request->getAttribute("rol");
        $legajoToken = $request->getAttribute("legajo");
        $legajo = $args['legajo'];
        $usuario = Usuario::where('legajo','=',$legajo)->get()[0];

        if($legajoToken == $legajo || $rol == "admin")
        {
            switch ($rol) {
                case 'alumno':
                    if(array_key_exists("email",$parametros))
                    {
                        // Agregar lo de la foto
                        $usuario->email = $parametros["email"];
                        $usuario->save();
                    }

                    break;
                case 'profesor':
                    if(array_key_exists("email",$parametros))
                    {
                        // Agregar lo de las materias
                        $usuario->email = $parametros["email"];
                        $usuario->save();
                    }
                    break;
                case 'admin':
                    if(array_key_exists("email",$parametros))
                    {
                        // Agregar lo de las materias
                        $usuario->email = $parametros["email"];
                        $usuario->save();
                        echo $usuario->email;
                    }
                    break;
            }
        }
        $newResponse = $response->withJson('Usuario '.$legajo.' modificado', 200);
        return $newResponse;
    }

    public function Login($request, $response, $args)
    {
        $parametros = $request->getParsedBody();
        $legajo = $parametros['legajo'];
        $clave = $parametros['clave'];
        $query = [['legajo', '=' , $legajo],['clave', '=' , $clave]];
        $usuario = Usuario::where($query)->join("tipos","usuarios.id_tipo","tipos.id")
                                        ->select("usuarios.id","usuarios.nombre","usuarios.email","usuarios.legajo",
                                                "usuarios.clave","tipos.tipo")
                                        ->get()->toArray();

        if($usuario != null && $usuario[0]["clave"] == $clave)
        {
            unset($usuario[0]["clave"]);
            $token = AutentificadorJWT::CrearToken($usuario);
        }
        return $response->withJson($token, 200); ;
    }

    public function ValidarRol($request, $response, $next)
    {
        $token = $request->getHeader("token")[0];

        if(AutentificadorJWT::VerificarToken($token))
        {
            $data = AutentificadorJWT::ObtenerData($token);
            $usuario = $data[0];
            $request = $request->withAttribute("rol",$usuario->tipo);
            $request = $request->withAttribute("legajo",$usuario->legajo);
            $newResponse = $next($request, $response);

            return $newResponse;
        }
    }
}
