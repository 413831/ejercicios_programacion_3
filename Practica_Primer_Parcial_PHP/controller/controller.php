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
           $tmpName = $foto["tmp_name"];
           $extension = pathinfo($foto["name"], PATHINFO_EXTENSION);
           $filename = "./imagenes/" . $email . "." . $extension; // CHEQUEAR EXTENSION DE ARCHIVO
           $rta = move_uploaded_file($tmpName, $filename);

           if ($rta === true) {
               // Creo el nuevo alumno
               $alumno = new Alumno($nombre, $apellido, $email, $filename);
               $rta = self::$archivo->guardar($alumno);
               if ($rta === true) {
                   echo 'Se cargo el alumno ' . $alumno->nombre . " " . $alumno->apellido;
               } else {
                   echo 'Hubo un error al guardar';
               }
           } else {
               echo 'Hubo un error con la fotos';
           }
       } else {
           echo "No se puede cargar el alumno";
       }
   }

   // Busca todos los alumnos con un apellido determinado
   public static function consultarAlumno($apellido,$archivo)
   {
      self::initialize($archivo);
      $alumnos = self::$archivo->getObjects("apellido", $apellido);

      if($alumnos != null)
      {
        return $alumnos;
      }
      else {
        return "No existe alumno con apellido ".$apellido;
      }
   }

   // Alta materia
   public static function cargarMateria($nombre, $codigo, $cupo, $aula, $archivo) {
        self::initialize($archivo);
        $materia = new Materia($nombre, $codigo, $cupo, $aula);
        $materiaExistente = self::$archivo->getObject("codigo", $codigo);
        if (is_null($materiaExistente)) {
            self::$archivo->guardar($materia);
            echo 'Se cargo la materia ' . $materia->nombre;
        } else {
            echo "Materia ya cargada.";
        }
    }

   // Modifica todos los datos de un alumno y crea backup de foto anterior
   public static function modificarAlumno($POST, $FILES, $archivo)
   {
       self::initialize($archivo);
       $alumnoAModificar = self::$archivo->getObject("email", $POST["email"]);
       if(!is_null($alumnoAModificar))
       {
             /// Me guardo el valor actual de todas la claves del usuario, si el usuario deseará modificarlas, se pisaran.
             if (array_key_exists("apellido", $POST) && $alumnoAModificar->apellido != $POST["apellido"]) {
                 $alumnoAModificar->apellido = $POST["apellido"];
             }

             if (array_key_exists("nombre", $POST) && $alumnoAModificar->nombre != $POST["nombre"]) {
                 $alumnoAModificar->nombre = $POST["nombre"];
             }

             if (array_key_exists("foto", $FILES)) {
                 $rta = true;
                 $fechaBkp = date("d-m-Y_H_i");
                 $array = explode(".", $alumnoAModificar->foto);
                 //Genero la ruta para almacenar la foto de backup
                 $rutaParaBkp = "./imagenes/backUpFotos/" .$alumnoAModificar->apellido . $fechaBkp . "." . end($array);
                 // Hago backup de la foto
                 move_uploaded_file($alumnoAModificar->foto,$rutaParaBkp);
                 rename($alumnoAModificar->foto, $rutaParaBkp);
                 //Modificacion
                 $tmpName = $FILES["foto"]["tmp_name"];
                 $extension = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);
                 // Cambio el nombre de la foto y coloco email.extension
                 $alumnoAModificar->foto = "./imagenes/" . $POST["email"] . "." . $extension;
                 $rta = move_uploaded_file($tmpName, $alumnoAModificar->foto);
             }

             if($rta === true)
             {
                 $rta = self::$archivo->modificar("email", $POST["email"], new Alumno($alumnoAModificar->nombre,
                                                                                      $alumnoAModificar->apellido,
                                                                                      $POST["email"], $alumnoAModificar->foto));
                 if($rta) {
                     echo "Modificacion realizada";
                 } else {
                     echo "No se pudo realizar la modificacion";
                 }
             } else {
                 echo "Hubo un problema con la foto";
             }
         } else {
             echo "No se encontro el alumno";
         }
   }

   // VERIFICAR COMO MOSTRAR IMAGEN
   public static function mostrarAlumnos($alumnos)
   {
     self::initialize($alumnos);
     echo "<table border=1px>";
     $jsonObject = json_decode(self::$archivo->listar());
     echo "<tr><th>Nombre</th><th>Apellido</th><th>Email</th><th>Foto</th></tr>";
     foreach ($jsonObject as $object) {
       echo "<tr>";
       echo "<td>".$object->nombre."</td>";
       echo "<td>".$object->apellido."</td>";
       echo "<td>".$object->email."</td>";
       echo "<td><img src=\".$object->foto.\" alt=\"Foto de alumno\"></td>\"";
       echo "</tr>";

     }
     echo "</table>";
     //var_dump($jsonObject);
     //return $rta;
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
                    echo 'Se inscribio al alumno';
                }
                else
                {
                    echo 'Hubo un error al restar el cupo de la materia';
                }
            } else {
                echo 'Hubo un error al inscribir el alumno';
            }
        }
        else
        {
            echo 'Hubo un error al inscribir el alumno  ';
        }
    }

    public static function mostrarInscripciones($GET,$inscripciones){
        self::initialize($inscripciones);

        if(array_key_exists("codigoMateria", $GET)) //poner primero el campo que esta en null para que no salte error por Undefined index
        {
            $rta = "Alumnos filtrados por materia\n" . self::$archivo->getObjects("codigoMateria", $GET["codigoMateria"]);
        }
        else if(array_key_exists("apellidoAlumno", $GET))
        {
            $rta = "Alumnos filtrados por apellido\n" . self::$archivo->getObjects("apellidoAlumno", $GET["apellidoAlumno"]);
        }
        else if(array_key_exists("apellidoAlumno", $GET) && array_key_exists("codigoMateria", $GET))
        {
            $rta = "no se pueden filtrar los campos apellido y materia juntos";
        }
        else if(!array_key_exists("apellidoAlumno", $GET) && !array_key_exists("codigoMateria", $GET)){
            $rta = self::$archivo->listar();
        }
        return $rta;
    }

   // Verifica si es una imagen valida
   static function isImage($imagen, $mb): bool
   {
       if ((explode("/", $imagen["type"])[0] == "image") &&
            ($imagen["size"]) < ($mb * 1024 * 1024)) {
           return true;
       } else {
           throw new Exception("No es un archivo de imagen valido."); // VERIFICAR CATCH PARA EXCEPCION
       }
   }

}


 ?>
