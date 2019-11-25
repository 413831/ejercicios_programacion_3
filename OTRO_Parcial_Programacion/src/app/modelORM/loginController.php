<?php
namespace App\Models\ORM;
use App\Models\ORM\usuario;
use App\Models\ORM\egreso;
use App\Models\ORM\ingreso;
use App\Models\AutentificadorJWT;

include_once __DIR__ . '/ingreso.php';
include_once __DIR__ . '/egreso.php';
include_once __DIR__ . '../../modelAPI/AutentificadorJWT.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class loginController
{
  public function Login($request, $response, $args)
    {
        $parametros = $request->getParsedBody();
        $clave = $parametros['clave'];
        $email = $parametros['email'];
        $legajo = $parametros['legajo'];
        if($legajo < 100)
        {
            $rol = "administrador";
        }
        else {
            $rol = "usuario";
        }
        $query = [['legajo', '=' , $legajo],['clave', '=' , $clave],['email', '=' , $email]];
        $usuario = Usuario::where($query)->get()->toArray();
        $emailValido = strcasecmp($usuario[0]["email"],$parametros["email"]);
        $claveValida = strcasecmp($usuario[0]["clave"],$parametros["clave"]);

        if($usuario != null && $emailValido == 0 && $claveValida == 0)
        {
            unset($usuario[0]["clave"]);
            $usuario[0]["rol"] = $rol;
            $token = AutentificadorJWT::CrearToken($usuario);
            return $response->withJson($token, 200); ;
        }
        else {
            return json_encode(array('mensaje' => 'No se encontro al usuario.'));
        }
    }


  public function IngresoUsuario($request, $response, $args)
  {
      $token = $request->getHeader("token")[0];
      $data = AutentificadorJWT::ObtenerData($token);
      var_dump($data);
      $ingreso = new Ingreso;
      $ingreso->usuario = $data[0]->email . $data[0]->legajo;
      $ingreso->save();
      return $response;
  }

  public function EgresoUsuario($request, $response, $next)
  {

  }

  public function ValidarToken($request, $response, $next)
   {
     if(array_key_exists("HTTP_TOKEN",$request->getHeaders()))
     {
       $token = $request->getHeader("token")[0];
       if(AutentificadorJWT::VerificarToken($token))
       {
         $newResponse = $next($request, $response);
       }
       {
         $newResponse = $response;
       }
     }
     else {
      $newResponse = $response;
     }
     return $newResponse;
   }
}
