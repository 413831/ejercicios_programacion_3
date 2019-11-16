<?php
namespace App\Models\ORM;
use App\Models\ORM\materia;
use App\Models\ORM\inscripcion;
use App\Models\IApiControler;
use App\Models\AutentificadorJWT;

include_once __DIR__ . '/materia.php';
include_once __DIR__ . '/inscripcion.php';
include_once __DIR__ . '../../modelAPI/IApiControler.php';
include_once __DIR__ . '../../modelAPI/AutentificadorJWT.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class materiaController implements IApiControler
{
 	  public function Beinvenida($request, $response, $args) {
      $response->getBody()->write("GET => Bienvenido!!! ,a UTN FRA SlimFramework");

    return $response;
    }

    public function TraerTodos($request, $response, $args) {
        $legajo = $request->getAttribute("legajo");
        $rol = $request->getAttribute("rol");
        if($rol == "profesor" || $rol == "alumno" )
        {
            $materias = Inscripcion::where("usuario",'=',$legajo)->join('usuarios','inscripciones.usuario','=','usuarios.legajo')
                                                                ->join('materias','inscripciones.materia','=','materias.id')
                                                                ->select('usuarios.nombre','usuarios.legajo','materias.id','materias.materia')
                                                                ->get();
        }
        else {
            $materias = Inscripcion::join('usuarios','inscripciones.usuario','=','usuarios.legajo')
                                    ->join('materias','inscripciones.materia','=','materias.id')
                                    ->select('materias.id','materias.materia')
                                    ->get();
        }
       	$newResponse = $response->withJson($materias, 200);
      	return $newResponse;
    }

    public function TraerUno($request, $response, $args) {
     	//complete el codigo
      $legajo = $request->getAttribute("legajo");

      $rol = $request->getAttribute("rol");
      $materias = Inscripcion::where("usuario",'=',$legajo)->get();
     	$newResponse = $response->withJson($materias, 200);
    	return $newResponse;
    }

    public function InscripcionMateria($request, $response, $args)
    {
        $rol = $request->getAttribute("rol");
        $legajo = $request->getAttribute("legajo");
        $idMateria = $args['materia'];
        $materia = Materia::find($idMateria);

        if($materia != null && $materia->cupo > 0)
        {
            $inscripcion = new Inscripcion;
            $inscripcion->materia = $idMateria;
            $inscripcion->usuario = $legajo;
            $inscripcion->save();
            if($rol == "alumno")
            {
                $materia->cupo -= 1;
                $materia->save();
            }
            $newResponse = $response->withJson(Inscripcion::find($inscripcion->id), 200);
        }
        else {
            $newResponse = "No es posible realizar inscripcion.";
        }
         return $newResponse;
    }

    public function CargarUno($request, $response, $args) {

     $rol = $request->getAttribute("rol");

     if($rol == "admin")
     {
         $parametros = $request->getParsedBody();
         $materia = new Materia;
         $materia->materia = $parametros['materia'];
         $materia->cuatrimestre = $parametros['cuatrimestre'];
         $materia->cupo = $parametros['cupo'];
         $materia->save();

       	 $newResponse = $response->withJson(Materia::find($materia->id), 200);
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
      $materia = Materia::find($id);
      $materia->delete();
      $newResponse = $response->withJson('Materia '.$id.' borrada', 200);
      return $newResponse;
    }

    public function ModificarUno($request, $response, $args) {
     	//complete el codigo
      $parametros = $request->getParsedBody();
      $id = $args['id'];
      $materia = Materia::find($id);
      $materia->materia = $parametros['materia'];
      $materia->cuatrimestre = $parametros['cuatrimestre'];
      $materia->cupo = $parametros['cupo'];
      $materia->save();
      $newResponse = $response->withJson('Materia '.$id.' modificado', 200);
      return $newResponse;
    }

}
