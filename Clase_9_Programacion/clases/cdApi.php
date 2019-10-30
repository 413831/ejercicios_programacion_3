<?php
use \Firebase\JWT\JWT;

class cdApi
{
    public $alumnos;

    public function __construct()
    {

    }

    public function funcionPost($request, $response, $args)
    {
        $response->getbody()->write("</br>Dentro del POST");
        return $response->getbody()->write("</br>REQUEST POST");
    }

    public function funcionGet($request, $response, $args)
    {
        $response->getbody()->write("</br>Dentro del GET");
        return $response->getbody()->write("</br>REQUEST GET");
    }

    public function altaUsuario($request, $response, $args)
    {
        $parametros = $request->getParsedBody();
        $usuario = $parametros["nombre"];
        $clave = $parametros["clave"];

        $payload = array(
            'nombre' => $usuario,
            'clave' => $clave,
            'status' => 'alta'
        );
        $token = JWT::encode($payload,$clave);
        $dao = new genericDao("./usuarios.json");
        var_dump($token);
        if($dao->guardar($token))
        {
            $response->getbody()->write(json_encode(array("mensaje" => "Alta de usuario realizada.")));
        }
    }

    public function loginUsuario($request, $response, $args)
    {
        try{
            $parametros = $request->getParsedBody();
            $clave = $parametros["clave"];
            $token = $request->getHeader("token")[0];

            $datos = JWT::decode($token,$clave,array('HS256'));
            var_dump($datos);

        }
        catch(Exception $e)
        {
            echo "CLAVE INVALIDA";
        }
    }

}
