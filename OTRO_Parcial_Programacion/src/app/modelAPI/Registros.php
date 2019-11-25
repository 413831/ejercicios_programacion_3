<?php
class Middleware
{
  public function Registro($request, $response, $next)
  {
      $response->getbody()->write("</br>Middleware 1 de Clase");
      $ruta = $request->getRequestTarget();
      $metodo = $request->getMethod();
      $ip = $request->getServerParam('REMOTE_ADDR');
      $server = $request->getServerParam('HTTP_HOST');
      $software = $request->getServerParam('SERVER_SOFTWARE');
      $fecha = date('Y-m-d H:i:s',$request->getServerParam('REQUEST_TIME'));
      $mensaje = "</br></br>LOG:"."</br>".$ruta."</br>".$metodo."</br>".$fecha."</br>".$ip."</br>".$server."</br>".$software; // Genero el LOG
      $log = new Log($ruta, $metodo, $fecha,$ip, $server, $software);
      $dao = new GenericDao("./info.log");
      $dao->guardar($log);
      $response = $next($request,$response); // Se va a la funcion NEXT
      $response->getbody()->write("</br>Middleware 1 de Clase");
      $response->getbody()->write($mensaje);
      return $response;
  }
}
 ?>
