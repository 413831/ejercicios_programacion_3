<?php

class Controller
{
  private static $archivo;

  private static function initialize($archivo)
  {
      self::$archivo = new GenericDao($archivo);
  }

    // Alta alumno
   public static function cargarAlumno($nombre, $apellido, $email, $foto, $archivo)
   {
      self::initialize($archivo);
       // Valido que el objeto no existe en el JSON
       // Valido que la foto tenga formato valido
       if (self::isImage($foto,2) && file_exists($archivo) > 0 && !self::$archivo->exists("email", $email)) {
           // Primero guardo la imagen
           $tmpName = $foto->getClientFilename();
           $extension = pathinfo($tmpName, PATHINFO_EXTENSION);
           $filename = "./img/" . $email . "." . $extension; // CHEQUEAR EXTENSION DE ARCHIVO
           $foto->moveTo($filename);

           // Creo el nuevo alumno
           $alumno = new Alumno($nombre, $apellido, $email, $filename);
           $rta = self::$archivo->guardar($alumno);
           if ($rta === true) {
             echo json_encode(array('mensaje' => 'Se cargo el alumno ' . $alumno->nombre . " " . $alumno->apellido));
           } else {
             echo json_encode(array('mensaje' => 'Hubo un error al guardar'));
           }

       } else {
          echo json_encode(array('mensaje' => "No se puede cargar el alumno"));
       }
   }

   // VERIFICAR COMO MOSTRAR IMAGEN
   public static function mostrarAlumnos($alumnos)
   {
     // cargo el archivo de alumnos
     self::initialize($alumnos);
     // decodifico el JSON
     $jsonObject = json_decode(self::$archivo->listar());
     // Creo tabla con datos del JSON y retorno
     return self::createTable($jsonObject);
     //var_dump($jsonObject);
     //return $rta;
   }

   // Busca todos los alumnos con un apellido determinado
   public static function mostrarAlumno($apellido,$archivo)
   {
      self::initialize($archivo);
      $alumno = self::$archivo->getObject("apellido", $apellido);
      // decodifico el JSON
      $jsonObject = json_decode($alumno);

      if($jsonObject != null)
      {
        // Creo tabla con datos del JSON y retorno
        return self::createTable($jsonObject);
      }
      else {
        return json_encode(array('mensaje' => "No existe alumno con apellido ".$apellido));
      }
   }

   // Alta materia
   public static function cargarMateria($nombre, $codigo, $cupo, $aula, $archivo) {
        self::initialize($archivo);
        $materia = new Materia($nombre, $codigo, $cupo, $aula);
        $materiaExistente = self::$archivo->getObject("codigo", $codigo);
        if (is_null($materiaExistente)) {
            self::$archivo->guardar($materia);
            echo json_encode(array('mensaje' => 'Se cargo la materia ' . $materia->nombre));
        } else {
            echo json_encode(array('mensaje' => "Materia ya cargada."));
        }
    }

   // Modifica todos los datos de un alumno y crea backup de foto anterior
   public static function modificarAlumno($archivos,$parametros, $archivo)
   {
       self::initialize($archivo);
       $alumnoAModificar = self::$archivo->getObject("email", $parametros["email"]);
       var_dump($alumnoAModificar);
       if(!is_null($alumnoAModificar))
       {
             /// Me guardo el valor actual de todas la claves del usuario, si el usuario deseará modificarlas, se pisaran.
             if (array_key_exists("apellido", $parametros) && $alumnoAModificar->apellido != $parametros["apellido"]) {
                 $alumnoAModificar->apellido = $parametros["apellido"];
             }

             if (array_key_exists("nombre", $parametros) && $alumnoAModificar->nombre != $parametros["nombre"]) {
                 $alumnoAModificar->nombre = $parametros["nombre"];
             }

             if (array_key_exists("foto", $archivos)) {
                 $rta = true;
                 $fechaBkp = date("d-m-Y_H_i");
                 $array = explode(".", $alumnoAModificar->foto);
                 //Genero la ruta para almacenar la foto de backup
                 $rutaParaBkp = "./img/backup/" .$alumnoAModificar->apellido . $fechaBkp . "." . end($array);
                 // Hago backup de la foto
                 rename($alumnoAModificar->foto, $rutaParaBkp);
                 //Modificacion
                 $foto = $archivos["foto"];
                 $tmpName = $foto->getClientFilename();
                 $extension = pathinfo($tmpName, PATHINFO_EXTENSION);
                 // Cambio el nombre de la foto y coloco email.extension
                 $alumnoAModificar->foto = "./img/" . $parametros["email"] . "." . $extension;
                 // Muevo la foto recibida a la ruta asociada a la foto del alumno
                 $foto->moveTo($alumnoAModificar->foto);
             }

             $rta = self::$archivo->modificar("email", $parametros["email"], new Alumno($alumnoAModificar->nombre,
                                                                                  $alumnoAModificar->apellido,
                                                                                  $parametros["email"], $alumnoAModificar->foto));
             if($rta) {
               echo json_encode(array('mensaje' => "Modificacion realizada"));
             } else {
               echo json_encode(array('mensaje' => "No se pudo realizar la modificacion"));
             }

         } else {
            echo json_encode(array('mensaje' => "No se encontro el alumno"));
         }
   }



   // PARA QUE CORNO RECIBO NOMBRE Y APELLIDO DE ALUMNO?
   public static function inscribirAlumno($nombreAlumno, $apellidoAlumno, $emailAlumno, $nombreMateria, $codigoMateria,
                                          $materias, $alumnos, $inscripciones)
   {
        self::initialize($materias);
        //Valido que la materia exista
        $materiaObtenida = self::$archivo->getObject("codigo", $codigoMateria);
        if(is_null($materiaObtenida))
        {
          throw new Exception("La materia no existe.");
        }
        else if ($materiaObtenida->cupo == 0)
        {
          throw new Exception("No hay cupo para la materia.");
        }
        //Valido que el alumno exista
        self::initialize($alumnos);
        $alumnoObtenido = self::$archivo->getObject("email", $emailAlumno);
        if(!is_null($alumnoObtenido) && !is_null($materiaObtenida) && $materiaObtenida->cupo > 0){
            self::initialize($inscripciones);
            $inscripcion = new Inscripcion($alumnoObtenido->nombre, $alumnoObtenido->apellido, $alumnoObtenido->email,
                                            $materiaObtenida->nombre, $codigoMateria);
            $rta = self::$archivo->guardar($inscripcion);
            if ($rta === true) {
                //materia con cupo restado
                self::initialize($materias);
                $materiaObtenida->cupo - 1;
                $rta = self::$archivo->modificar("codigo",$codigoMateria, $materiaObtenida);
                if($rta === true)
                {
                  echo json_encode(array('mensaje' => 'Se inscribio al alumno'));
                }
                else
                {
                    echo json_encode(array('mensaje' => 'Hubo un error al restar el cupo de la materia'));
                }
            } else {
                echo json_encode(array('mensaje' => 'Hubo un error al inscribir el alumno'));
            }
        }
        else
        {
            echo json_encode(array('mensaje' => 'Hubo un error al inscribir el alumno'));
        }
    }

    public static function mostrarInscripciones($GET,$inscripciones){
        self::initialize($inscripciones);

        if(array_key_exists("codigoMateria", $GET)) //poner primero el campo que esta en null para que no salte error por Undefined index
        {
            $rta = self::$archivo->getObjects("codigoMateria", $GET["codigoMateria"]);
        }
        else if(array_key_exists("apellidoAlumno", $GET))
        {
            $rta = self::$archivo->getObjects("apellidoAlumno", $GET["apellidoAlumno"]);
        }
        else if(array_key_exists("apellidoAlumno", $GET) && array_key_exists("codigoMateria", $GET))
        {
            echo "no se pueden filtrar los campos apellido y materia juntos";
        }
        else if(!array_key_exists("apellidoAlumno", $GET) && !array_key_exists("codigoMateria", $GET)){
            $rta = self::$archivo->listar();
        }
        self::createTable($rta);
    }

   // Verifica si es una imagen valida
   static function isImage($imagen, $mb): bool
   {
       if (($imagen->getClientMediaType() == "image/jpeg") && $imagen->getSize() < ($mb * 1024 * 1024)) {
           return true;
       } else {
           throw new Exception("No es un archivo de imagen valido."); // VERIFICAR CATCH PARA EXCEPCION
       }
   }

   static function createTable($objetos){
     $tabla = "<table border=1px>";
     $tabla .= "<tr><th>Nombre</th><th>Apellido</th><th>Email</th><th>Foto</th></tr>";
     foreach ($objetos as $object) {
       $tabla .= "<tr>";
       $tabla .= "<td>".$object->nombre."</td>";
       $tabla .= "<td>".$object->apellido."</td>";
       $tabla .= "<td>".$object->email."</td>";
      $image = $object->foto;
      // Read image path, convert to base64 encoding
      $imageData = base64_encode(file_get_contents($image));

      // Format the image SRC:  data:{mime};base64,{data};
      $src = 'data: '.mime_content_type($image).';base64,'.$imageData;
      // Echo out a sample image
      $tabla .= '<td><img src="' . $src . '" width="150" height="200"></td>';
      $tabla .= "</tr>";
     }
     $tabla .= "</table>";
     return $tabla;
   }
}


 ?>
