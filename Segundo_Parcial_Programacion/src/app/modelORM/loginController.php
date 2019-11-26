<?php
namespace App\Models\ORM;
use App\Models\ORM\user;
use App\Models\ORM\ingreso;
use App\Models\ORM\egreso;
use App\Models\AutentificadorJWT;

include_once __DIR__ . '../../modelAPI/AutentificadorJWT.php';
include_once __DIR__ . '/ingreso.php';
include_once __DIR__ . '/egreso.php';

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

        $claveCodificada = $this->BuscarClave($clave);

        if($legajo < 100)
        {
            $rol = "administrador";
        }
        else {
            $rol = "usuario";
        }

        if(!is_null($claveCodificada));
        {
            echo "clave encontrada";
            $query = [['legajo', '=' , $legajo],['clave', '=' , $claveCodificada],['email', '=' , $email]];
            $usuario = User::where($query)->get()->toArray();
            $emailValido = strcasecmp($usuario[0]["email"],$parametros["email"]);
            $claveValida = strcasecmp($usuario[0]["clave"],$claveCodificada);
    
            if($usuario != null && $emailValido == 0 && $claveValida == 0)
            {
                unset($usuario[0]["clave"]);
                $token = AutentificadorJWT::CrearToken($usuario);               
                $usuario[0]["rol"] = $rol;
                return $response->withJson($token, 200);
            }
            else {
                return json_encode(array('mensaje' => 'No se encontro al usuario.'));
            }
        }
    }

    public function IngresoUsuario($request, $response, $args)
    {
        $token = $request->getHeader("token")[0];
        $data = AutentificadorJWT::ObtenerData($token);
        $cantIngresos = Ingreso::where("usuario", "=", $data[0]->legajo.$data[0]->email.$data[0]->id)->select('created_at')->get()->toArray();
        $cantEgresos = Egreso::where("usuario", "=", $data[0]->legajo.$data[0]->email.$data[0]->id)->select('created_at')->get()->toArray();
        if(count($cantEgresos) == count($cantIngresos))
        {
            $ingreso = new Ingreso;
            $ingreso->usuario = $data[0]->legajo.$data[0]->email.$data[0]->id;
            $ingreso->save();
            $newResponse = $response->withJson("Sesion iniciada.", 200);
        }
        else
        {
            $newResponse = $response->withJson("El usuario ya tiene una sesion iniciada", 200);
        }

        return $newResponse ;
    }

    public function EgresoUsuario($request, $response, $next)
    {
        $token = $request->getHeader("token")[0];
        $data = AutentificadorJWT::ObtenerData($token);        
        $cantIngresos = Ingreso::where("usuario", "=", $data[0]->legajo.$data[0]->email.$data[0]->id)->select('created_at')->get()->toArray();
        $cantEgresos = Egreso::where("usuario", "=", $data[0]->legajo.$data[0]->email.$data[0]->id)->select('created_at')->get()->toArray();
     
        if(count($cantIngresos) == 0 || count($cantIngresos) <= count($cantEgresos))
        {
            $newResponse = $response->withJson("No se ha iniciado sesion.", 200);
        }
        else{
            $egreso = new Egreso;
            $egreso->usuario = $data[0]->legajo.$data[0]->email.$data[0]->id;      
            $egreso->save();
            $newResponse = $response->withJson("Sesion cerrada.", 200);
        }
      return $newResponse;  


        return $response;
    }

    public function Ingresos($request, $response, $args)
    {
        $token = $request->getHeader("token")[0];
        $data = AutentificadorJWT::ObtenerData($token);
        $email = $data->email;
        $ingresos = Ingreso::where("usuario","=",$data[0]->legajo.$data[0]->email.$data[0]->id)->select("usuario","created_at")->get();
        if(count($ingresos) != 0)
        {
            $newResponse = $response->withJson($ingresos, 200);
        }
        else
        {
            $newResponse = $response->withJson("El usuario no tiene ingresos", 200);
        }
        return $newResponse;
    }

    public function TodosLosIngresos($request, $response, $args)
    {
        $token = $request->getHeader("token")[0];
        //$data = AutentificadorJWT::ObtenerData($token);
        $rol = $data->rol;
        if($rol == "administrador")
        {
            $usuarios = Ingreso::distinct()->get(["usuario"])->toArray();
            if($usuarios != null)
            {
                for($i=0;$i<count($usuarios);$i++)
                {
                    $ingresos = Ingreso::where("usuario","=", $usuarios[$i]["usuario"])
                    ->select("usuario","created_at")
                    ->orderBy("created_at","desc")
                    ->first()
                    ->toArray();
                    $ultimosIngresos[] = $ingresos;
                }
                $newResponse = $response->withJson($ultimosIngresos, 200);
            }
            else{
                $newResponse = $response->withJson("No hay ingresos", 200);
            }
        }
        else
        {
            $newResponse = $response->withJson("Esta accion solo la puede cumplir un Admin", 200);
        }
        return $newResponse;
    }

    public function BuscarClave($clave)
    {
        $registros = User::select('clave')->get();

        for($i = 0;$i < count($registros);$i++)
        {
            $claveDecodificada = AutentificadorJWT::ObtenerData($registros[$i]->clave);
            if($clave == $claveDecodificada)
            {
                return $registros[$i]->clave;
            }
        }
        return null;
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
       else
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
