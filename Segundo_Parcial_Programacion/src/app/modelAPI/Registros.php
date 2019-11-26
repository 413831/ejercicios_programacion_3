<?php
namespace App\Models;

use App\Models\ORM\Log;
use App\Models\AutentificadorJWT;
use App\Models\ORM\ingreso;
use App\Models\ORM\egreso;

include_once __DIR__ . '../../modelAPI/AutentificadorJWT.php';
include_once __DIR__ . '../../modelORM/ingreso.php';
include_once __DIR__ . '../../modelORM/egreso.php';

class Middleware
{
  public function Registro($request, $response, $next)
  {
      $usuario = "Usuario sin token";
      
      if (array_key_exists("HTTP_TOKEN",$request->getHeaders()))
      {
        $usuario = $request->getHeader("token")[0];
      }
    
      $ruta = $request->getRequestTarget();
      $metodo = $request->getMethod();
      $ip = $request->getServerParam('REMOTE_ADDR');
      $fecha = date('Y-m-d H:i:s',$request->getServerParam('REQUEST_TIME'));
      $mensaje = json_encode(array('ruta' => $ruta, 'metodo' => $metodo, 'fecha' => $fecha,
                      'ip' => $ip));

      $log = new Log;
      $log->usuario = $usuario;
      $log->ruta = $ruta;
      $log->metodo = $metodo;
      $log->fecha = $fecha;
      $log->ip = $ip;
      $log->save();

      $dao = new GenericDao("./info.json");
      $dao->guardar($log);

      $response = $next($request,$response); // Se va a la funcion NEXT
      //$response->getbody()->write($mensaje);
      return $response;
  }
}
 ?>
