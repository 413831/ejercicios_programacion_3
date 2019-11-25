<?php
namespace App\Models;

use App\Models\Log;
use App\Models\AutentificadorJWT;

include_once __DIR__ . '../../modelAPI/AutentificadorJWT.php';

class Middleware
{
  public function Registro($request, $response, $next)
  {
      // GUARDAR TOKEN DE USUARIO
      $ruta = $request->getRequestTarget();
      $usuario = "Usuario sin token";
      
      if(array_key_exists("HTTP_TOKEN",$request->getHeaders()))
      {
        $token = $request->getHeader("token")[0];
        $usuario = AutentificadorJWT::ObtenerData($token);
      }
      $metodo = $request->getMethod();
      $ip = $request->getServerParam('REMOTE_ADDR');
      $server = $request->getServerParam('HTTP_HOST');
      $software = $request->getServerParam('SERVER_SOFTWARE');
      $fecha = date('Y-m-d H:i:s',$request->getServerParam('REQUEST_TIME'));
      $mensaje = json_encode(array('ruta' => $ruta, 'metodo' => $metodo, 'fecha' => $fecha,
                      'ip' => $ip, 'server' => $server, 'software' => $software));

      $log = new Log($usuario,$ruta, $metodo, $fecha,$ip, $server, $software);
      $dao = new GenericDao("./info.json");
      $dao->guardar($log);

      $response = $next($request,$response); // Se va a la funcion NEXT
      $response->getbody()->write($mensaje);
      return $response;
  }
}
 ?>
