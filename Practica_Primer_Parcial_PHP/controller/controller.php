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
       //Valido que el objeto no existe en el JSON
       // Valido que la foto tenga formato valido
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
      $alumnos = $this->archivo->getObjects("apellido", $apellido);
      if($alumnos != null)
      {
        return $alumnos;
      }
      else {
        return "No existe alumno con apellido ".$apellido;
      }
   }

   // Alta materia
   function cargarMateria($nombre, $codigo, $cupo, $aula, $archivo) {
        self::initialize($archivo);
        $materia = new Materia($nombre, $codigo, $cupo, $aula);
        $materiaExistente = $this->archivo->getObject("codigo", $codigo);
        if (is_null($materiaExistente)) {
            $this->archivo->guardar($materia);
            echo 'Se cargo la materia ' . $materia->nombre;
        } else {
            echo 'Hubo un error al guardar';
        }
    }

   // Modifica todos los datos de un alumno y crea backup de foto anterior
   public static function modificarAlumno($POST, $FILES, $archivo)
   {
       self::initialize($archivo);
       $alumnoAModificar = $this->archivo->getObject("email", $POST["email"]);
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
                 $rta = $this->archivo->modificar("email", $POST["email"], new Alumno($alumnoAModificar->nombre,
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
   public static function mostrarAlumnos($archivo)
   {
      self::initialize($archivo);
       echo $this->archivo->listar();
   }

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
