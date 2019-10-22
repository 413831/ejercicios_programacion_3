<?php
class cdApi
{
    public $pizzas;

    public function __construct()
    {
        $this->pizzas = "./pizza.txt";
        $this->log = "./info.log";
        $this->ventas = "./venta.txt";

    }

    // Alta de un alumno, se guarda en un archivo txt como JSON
    public function guardarPizza($request, $response, $args){
        controller::registro($request,$this->log);
        $archivos = $request->getUploadedFiles();
        $parametros = $request->getParsedBody();
        $precio = $parametros['precio'];
        $tipo = $parametros['tipo'];
        $cantidad = $parametros['cantidad'];
        $sabor = $parametros['sabor'];
        $imagenUno = $archivos["imagenUno"];
        $imagenDos = $archivos["imagenDos"];
        
        if(self::validarTipo($tipo) && self::validarSabor($sabor))
        {
            $respuesta = Controller::altaPizza($precio, $tipo, $cantidad, $sabor, $imagenUno, $imagenDos, $this->pizzas);
            return $response->getbody()->write($respuesta);
        }
        else
        {
            echo json_encode(array('mensaje' => 'Tipo o sabor incorrecto.'));
        }       
    }
    
    public function modificarPizza($request, $response, $args){
        $archivos = $request->getUploadedFiles();
        $parametros = $request->getParsedBody();

        $respuesta = Controller::modificarPizza($archivos,$parametros,$this->pizzas);
        return $response->getbody()->write($respuesta);
    }

    public function mostrarPizzas($request, $response, $args){
        controller::registro($request,$this->log);
        $parametros = $request->getQueryParams();
        $sabor = $parametros['sabor'];
        $tipo = $parametros['tipo'];

        $respuesta = Controller::buscarPizzas($sabor,$tipo,$this->pizzas);
        return $response->getbody()->write($respuesta);
    }

    public function guardarVenta($request, $response, $args)
    {
        controller::registro($request,$this->log);
        $parametros = $request->getParsedBody();
        $email = $parametros['email'];
        $sabor = $parametros['sabor'];
        $tipo = $parametros['tipo'];
        $cantidad = $parametros['cantidad'];

        $respuesta = Controller::altaVenta($email,$cantidad,$sabor,$tipo,$this->ventas,$this->pizzas);
        return $response->getbody()->write($respuesta);
    }

    public static function validarTipo($tipo)
    {
        switch($tipo)
        {
            case "molde" :
                return true;                
            case "piedra" :
                return true;
            default :
                return false;
        }
    }

    public static function validarSabor($sabor)
    {
        switch($sabor)
        {
            case "muzzarella" :
                return true;                
            case "jamon" :
                return true;
            case "especial" :
                return true;
            default :
                return false;
        }
    }

}
