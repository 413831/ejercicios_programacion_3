<?php
    class IO
    {
        public $archivo;
        public function __construct($archivo)
        {
            $this->archivo = $archivo;
        }
        
        function guardar($object){
            $json = $this->listar();
            $archivo = fopen($this->archivo, "a");
            if(empty($json))
            {
                $objects = json_decode($json);
            }
            else
            {
                $objects = array();
            }
            array_push($objects, $object);
            fwrite($archivo, json_encode($objects));
            
            fclose($archivo);
        }
        function listar(){
            try {

                if(!file_exists($this->archivo))
                {
                    $archivo = fopen($this->archivo, "w");
                }
                else
                {
                    $archivo = fopen($this->archivo, "r");
                }
                return fread($archivo, filesize($this->archivo));
            }
            catch (Exception $e) {
                throw $e;
            }
            finally {
                fclose($archivo);
            }
        }

        function guardarImagen($nombreImagen,$destino,$legajo)
        {
            $imagen = $_FILES[$nombreImagen]["tmp_name"];
            $extension = pathinfo($_FILES[$nombreImagen]["name"],PATHINFO_EXTENSION);
            $nuevoNombre = $legajo;

            move_uploaded_file($imagen,"./".$nuevoNombre.".".$extension);
        }

        function modificarImagen($nuevaImagen,$ruta,$legajo)
        {
            $imagen = $_FILES[$nombreImagen]["tmp_name"];
            $extension = pathinfo($_FILES[$nombreImagen]["name"],PATHINFO_EXTENSION);
            $fileName = explode(".",$_FILES[$nombreImagen]["name"]);
            if($fileName == $legajo)
            {
                move_uploaded_file($imagen,"./".$legajo.".".$extension);
            }


        }
    }
?>