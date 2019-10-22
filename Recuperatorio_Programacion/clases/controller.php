<?php

class Controller
{
  private static $archivo;
  private static $id = 0;
  private static $idVenta = 0;

  private static function initialize($archivo)
  {
      self::$archivo = new GenericDao($archivo);
  }

    // Alta alumno
    public static function altaPizza($precio, $tipo, $cantidad, $sabor, $imagenUno, $imagenDos, $archivo)
    { 
        self::$id = self::getLastId($archivo);   
        self::$id++;
        self::initialize($archivo);

        if(!is_null($imagenUno) && !is_null($imagenDos))
        {
            $tmpName = $imagenUno->getClientFilename();
            $extension = pathinfo($tmpName, PATHINFO_EXTENSION);
            $filenameUno = "./images/pizza" . self::$id . "imagenUno." . $extension; 
            $imagenUno->moveTo($filenameUno);
    
            $tmpName = $imagenDos->getClientFilename();
            $extension = pathinfo($tmpName, PATHINFO_EXTENSION);
            $filenameDos = "./images/pizza" . self::$id . "imagenDos." . $extension;
            $imagenDos->moveTo($filenameDos);

            
            $pizza = new Pizza($precio, $tipo, $cantidad, $sabor, $filenameUno, $filenameDos, self::$id);
    
            $rta = self::$archivo->guardar($pizza);
            if ($rta === true) {
                echo json_encode(array('mensaje' => 'Se cargo la pizza ' . $pizza->id . " " . $pizza->sabor));
            } else {
                echo json_encode(array('mensaje' => 'Hubo un error al guardar'));
            }
        }
        else
        {
            echo json_encode(array('mensaje' => 'Hubo un error con las imagenes'));
        }
    }

    public static function modificarPizza($archivos,$parametros, $archivo)
   {
       self::initialize($archivo);
       $pizza = self::$archivo->obtenerPorId("id", $parametros["id"]);
       
       if(!is_null($pizza))
       {
           if (array_key_exists("precio", $parametros) && $pizza->precio != $parametros["precio"]) {
               $pizza->precio = $parametros["precio"];
           }

           if (array_key_exists("sabor", $parametros) && $pizza->sabor != $parametros["sabor"]) {
               $pizza->sabor = $parametros["sabor"];
           }

            if (array_key_exists("tipo", $parametros) && $pizza->tipo != $parametros["tipo"]) {
                $pizza->tipo = $parametros["tipo"];
            }

            if (array_key_exists("cantidad", $parametros) && $pizza->cantidad != $parametros["cantidad"]) {
                $pizza->cantidad = $parametros["cantidad"];
            }


           if (array_key_exists("imagenUno", $archivos)) {
               self::moveImage($archivos["imagenUno"], $pizza, $pizza->imagenUno,"Uno");
           }

           if (array_key_exists("imagenDos", $archivos)) {
            self::moveImage($archivos["imagenDos"], $pizza,$pizza->imagenDos,"Dos");
             }

           $rta = self::$archivo->modificar("id", $parametros["id"],
                                            new Pizza($pizza->precio, $pizza->tipo, $pizza->cantidad,
                                             $pizza->sabor, $pizza->imagenUno, $pizza->imagenDos, $pizza->id));
           if($rta) {
             echo json_encode(array('mensaje' => "Modificacion realizada"));
           } else {
             echo json_encode(array('mensaje' => "No se pudo realizar la modificacion"));
           }

       } else {
          echo json_encode(array('mensaje' => "No se encontro el item"));
       }
   }

    public static function buscarPizzas($sabor,$tipo,$archivo)
    {
       $arrayJson = array();
       self::initialize($archivo);
       $pizzas = self::$archivo->getObjects("sabor", $sabor, "tipo", $tipo);
        if(!is_null($pizzas))        
        {
            $pizzas = json_decode($pizzas); 
            foreach ($pizzas as $key => $pizza) 
             { 
                 unset($pizza->precio);
                 unset($pizza->imagenUno);
                 unset($pizza->imagenDos);
                array_push($arrayJson,$pizza);
            }
            return  json_encode($arrayJson);
        }
       else 
       {    
         return json_encode(array('mensaje' => "No existe sabor ".$sabor));
       }
    }

    public static function altaVenta($email,$cantidad,$sabor,$tipo,$ventas, $pizzas)
    {
        self::initialize($ventas);
        self::$idVenta = self::getLastId($ventas);
        self::$idVenta++;
        self::initialize($pizzas);
        $pizza = self::$archivo->getObject("sabor", $sabor, "tipo", $tipo, $cantidad);
        if(!is_null($pizza))        
        {
            //$pizza = json_decode($pizza); 
            $precioVenta = $pizza->precio + $cantidad;            
            $venta = new Venta(self::$id, $email, $precioVenta, $tipo, $cantidad, $sabor);
            self::initialize($ventas);
            $rta = self::$archivo->guardar($venta);
            if ($rta === true) {
                self::initialize($pizzas);
                $pizza->cantidad -= $cantidad;
                self::$archivo->modificar("id",$pizza->id,$pizza);
                echo json_encode(array('mensaje' => 'Se cargo la venta  N: '. self::$idVenta . " de " . $email ));
            } else {
                echo json_encode(array('mensaje' => 'Hubo un error al guardar'));
            }
        }
       else 
       {
         return json_encode(array('mensaje' => "No existe sabor ".$sabor));
       }
    }



   static function moveImage($foto, $entidad, $fotoAModificar ,$nombre)
   {
     if (!is_null($foto) && !is_null($entidad)) {
         $rta = true;
         $array = explode(".", $fotoAModificar);
         //Genero la ruta para almacenar la foto de backup
         $rutaParaBkp = "./images/backup/" .$entidad->id . $nombre . "." . end($array);
         // Hago backup de la foto
         rename( $fotoAModificar, $rutaParaBkp);
         //Modificacion
         $tmpName = $foto->getClientFilename();
         $extension = pathinfo($tmpName, PATHINFO_EXTENSION);
         // Cambio el nombre de la foto y coloco email.extension
         
         $fotoAModificar = "./images/pizza" . $entidad->id . "imagen". $nombre. "." . $extension;
         // Muevo la foto recibida a la ruta asociada a la foto del alumno
         $foto->moveTo( $fotoAModificar);
     }
   }

    static function getLastId($archivo)
    {
        $auxId = 0;
        self::initialize($archivo);
        $objects = json_decode(self::$archivo->listar());
        if(!is_null($objects)){
            foreach ($objects as $object) 
            {         
                $auxId = $object->id;
            }
        }
        return $auxId;
    }

    public static function registro($request, $archivo)
  {
        self::initialize($archivo);
        $ruta = $request->getRequestTarget();
        $metodo = $request->getMethod();
        $hora = getdate();

      if (file_exists($archivo))
      {
        $timestamp = "Hora:".$hora["hours"].":".$hora["minutes"].":".$hora["seconds"];
        $registro = new Log($ruta, $metodo, $timestamp);
        $rta = self::$archivo->guardar($registro);
      }
  }

   static function createTable($objetos){
     $tabla = "<table border=1px>";
     $tabla .= "<tr><th>Sabor</th><th>Tipo</th><th>Cantidad</th><th>Foto</th></tr>";
     foreach ($objetos as $object) {
       $tabla .= "<tr>";
       $tabla .= "<td>".$object->sabor."</td>";
       $tabla .= "<td>".$object->tipo."</td>";
       $tabla .= "<td>".$object->cantidad."</td>";
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
