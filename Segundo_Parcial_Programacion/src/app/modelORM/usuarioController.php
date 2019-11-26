<?php
namespace App\Models\ORM;
use App\Models\ORM\user;
use App\Models\IApiControler;
use App\Models\AutentificadorJWT;

include_once __DIR__ . '/user.php';
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
        $usuarios = User::all();
       	return $response->withJson($usuarios, 200);
    }

    public function TraerUno($request, $response, $args) {

    	return $response = json_encode(array('mensaje' => 'No implementado.'));
    }

    public function CargarUno($request, $response, $args) {
         //complete el codigo
        $parametros = $request->getParsedBody();
        $archivos = $request->getUploadedFiles();

        if (array_key_exists("email", $parametros) && array_key_exists("clave", $parametros)
        && array_key_exists("legajo", $parametros) && array_key_exists("imagenUno", $archivos)
        && array_key_exists("imagenDos", $archivos))
        {
            if(!User::where('legajo','=',$parametros['legajo'])->exists())
            {
                $usuario = new User;
                $usuario->email = $parametros['email'];

                $claveCodificada = AutentificadorJWT::CodificarClave($parametros['clave']);
                $usuario->clave = $claveCodificada;
                $usuario->legajo = $parametros['legajo'];
                $usuario->imagenUno = $this->CrearRutaImagen($archivos["imagenUno"],"./images/users/FotoUno",$usuario->legajo);
                $usuario->imagenDos = $this->CrearRutaImagen($archivos["imagenDos"],"./images/users/FotoDos",$usuario->legajo);
                $usuario->save();
                $response = json_encode(array('mensaje' => 'Alta exitosa.'));
            }
            else {
                $response = json_encode(array('mensaje' => 'Usuario ya existente'));
            }
        }
         else 
        {
         $response = json_encode(array('mensaje' => 'Datos insuficientes.'));
        }
        return $response;
    }

    public function BorrarUno($request, $response, $args) {
  		//complete el codigo
      return $response = json_encode(array('mensaje' => 'No implementado.'));
    }

    public function ModificarUno($request, $response, $args) {
     	//complete el codigo
      return $response = json_encode(array('mensaje' => 'No implementado.'));
    }

    public function CrearRutaImagen($imagen,$ruta,$nombre)
    {
        $tmpName = $imagen->getClientFilename();
        $extension = pathinfo($tmpName, PATHINFO_EXTENSION);
        $filename = $ruta . $nombre .".". $extension;
        $imagen->moveTo($filename);

        return $filename;
    }
}
