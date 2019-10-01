<?php

class Controller
{
  private static $archivo;

  private static function initialize($archivo)
  {
      self::$archivo = new GenericDao($archivo);
  }

  public static function registro($caso, $hora, $ip, $archivo)
  {
      self::initialize($archivo);

      if (file_exists($archivo))
      {
        $timestamp = "Hora:".$hora["hours"].":".$hora["minutes"].":".$hora["seconds"];
        $registro = new Log($caso, $timestamp ,$ip);
        $rta = self::$archivo->guardar($registro);
      }
  }

    // Alta alumno
   public static function cargarUsuario($nombre, $legajo, $email, $clave, $fotoUno, $fotoDos, $archivo)
   {
        self::initialize($archivo);
       // Valido que el objeto no existe en el JSON
      
       if (file_exists($archivo) > 0 && !self::$archivo->exists("legajo", $legajo)) 
        {
           // Primero guardo las imagenes
           $tmpName = $fotoUno["tmp_name"];
           $extension = pathinfo($fotoUno["name"], PATHINFO_EXTENSION);
           $pathFotoUno = "./img/fotos/" . $legajo ."FOTOUNO". "." . $extension;
           $rtaUno = move_uploaded_file($tmpName, $pathFotoUno);

           $tmpName = $fotoDos["tmp_name"];
           $extension = pathinfo($fotoDos["name"], PATHINFO_EXTENSION);
           $pathFotoDos = "./img/fotos/" . $legajo ."FOTODOS". "." . $extension;
           $rtaDos = move_uploaded_file($tmpName, $pathFotoDos);

           if ($rtaUno === true &&  $rtaDos === true) {
               // Creo el nuevo alumno
               $usuario = new Usuario($legajo, $nombre ,$email,$clave, $pathFotoUno, $pathFotoDos);
               $rta = self::$archivo->guardar($usuario);
               if ($rta === true) {
                    echo json_encode(array('mensaje' => "Se cargo nuevo usuario"));
                } 
                else {
                    echo json_encode(array('mensaje' => "Hubo un error al guardar"));
                }
            } else {
                echo json_encode(array('mensaje' => "Hubo un error con la fotos"));
           }
       } else {
        echo json_encode(array('mensaje' => "No se puede cargar el usuario"));

       }
   }

   public static function login($legajo,$clave,$archivo)
   {
        try
        {
            self::initialize($archivo);
            $usuarios = self::$archivo->getObject("legajo",$legajo,"clave", $clave);

            if($usuarios != null)
            {
               return $usuarios;
            }

        }
        catch (Exception $e){
             return json_encode(array('mensaje' => "Usuario inexistente: ", 'legajo' => $legajo));
        }    
   }

   public static function modificarUsuario($POST, $FILES, $archivo)
   {
       self::initialize($archivo);
       $usuario = self::$archivo->getById("legajo", $POST["legajo"]);
       
       if(!is_null($usuario))
       {
        
             /// Me guardo el valor actual de todas la claves del usuario, si el usuario deseará modificarlas, se pisaran.
             if (array_key_exists("nombre", $POST) && $usuario->nombre != $POST["nombre"]) {
                 $usuario->nombre = $POST["nombre"];
             }

             if (array_key_exists("email", $POST) && $usuario->nombre != $POST["email"]) {
                $usuario->email = $POST["email"];
             }

             if (array_key_exists("clave", $POST) && $usuario->clave != $POST["clave"]) {
                $usuario->clave = $POST["clave"];
             }

             if (array_key_exists("fotoUno", $FILES)) {

                 $array = explode(".", $usuario->fotoUno);
                 //Genero la ruta para almacenar la foto de backup
                 $rutaParaBkp = "./img/backup/" .$usuario->legajo . "primerFoto.". end($array);
 
                 // Hago backup de la foto
                // move_uploaded_file($usuario->fotoUno,$rutaParaBkp);
                 rename($usuario->fotoUno, $rutaParaBkp);
                 //Modificacion
                 $tmpName = $FILES["fotoUno"]["tmp_name"];
                 $extension = pathinfo($_FILES["fotoUno"]["name"], PATHINFO_EXTENSION);
                 // Cambio el nombre de la foto y coloco email.extension
                 $usuario->fotoUno = "./img/fotos/" . $usuario->legajo ."FOTOUNO". "." . $extension;
                move_uploaded_file($tmpName, $usuario->fotoUno);
             }

             if (array_key_exists("fotoDos", $FILES)) {

                $array = explode(".", $usuario->fotoDos);
                //Genero la ruta para almacenar la foto de backup
                $rutaParaBkp = "./img/backup/" .$usuario->legajo . "segundaFoto.". end($array);
                // Hago backup de la foto
               // move_uploaded_file($usuario->fotoDos,$rutaParaBkp);
                rename($usuario->fotoDos, $rutaParaBkp);
                //Modificacion
                $tmpName = $FILES["fotoDos"]["tmp_name"];
                $extension = pathinfo($_FILES["fotoDos"]["name"], PATHINFO_EXTENSION);
                // Cambio el nombre de la foto y coloco email.extension
                $usuario->fotoDos = "./img/fotos/" . $usuario->legajo ."FOTODOS". "." . $extension;
                move_uploaded_file($tmpName, $usuario->fotoDos);
            }
            $rta = self::$archivo->modificar("legajo", $POST["legajo"], new Usuario($usuario->legajo,$usuario->nombre,
                                                                                $usuario->email,$usuario->clave,
                                                                                $usuario->fotoUno ,$usuario->fotoDos));
            if($rta) {
                echo json_encode(array('mensaje' => "Modificacion realizada"));
            } else {
                echo json_encode(array('mensaje' => "No se pudo realizar la modificacion"));
            }
        } else {
            echo json_encode(array('mensaje' => "Hubo un problema con la foto"));
        }
   }

   public static function verUsuarios($archivo)
   {
        self::initialize($archivo);
        return self::$archivo->getObjects();
   }

   public static function verUsuario($legajo, $archivo)
   {
    self::initialize($archivo);
    return self::$archivo->getUsuarioById("legajo",$legajo);
   }

}


 ?>
