<?php
  class Middleware     
  {
    public function middleware1($request, $response, $next)
    {
        $response->getbody()->write("</br>Middleware 1 de Clase");
        $ruta = "</br>".$request->getRequestTarget();
        $metodo = "</br>".$request->getMethod();
        $ip = "</br>".$request->getServerParam('REMOTE_ADDR');
        $server = "</br>".$request->getServerParam('HTTP_HOST');
        $software = "</br>".$request->getServerParam('SERVER_SOFTWARE');
        $fecha = "</br>".date('Y-m-d H:i:s',$request->getServerParam('REQUEST_TIME'));        

        $mensaje = "</br></br>LOG:".$ruta.$metodo.$fecha.$ip.$server.$software; // Genero el LOG
        
        $response = $next($request,$response); // Se va a la funcion NEXT
        $response->getbody()->write("</br>Middleware 1 de Clase");
        $response->getbody()->write($mensaje);
        
        return $response;
    }
    
    public function middleware2($request, $response, $next){    
        $response->getbody()->write("</br>Middleware 2 de Clase");
        $response->getbody()->write("</br>Entrada ");
        $response = $next($request,$response); // Se va a la funcion NEXT
        $response->getbody()->write("</br>Salida ");
        $response->getbody()->write("</br>Middleware 2 de Clase");
    
        return $response;
    }
  }
 ?>