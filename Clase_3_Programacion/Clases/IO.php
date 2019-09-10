<?php
    class IO
    {
        public function __construct()
        {
            $datos = array();
            session_start();
            if(!isset($_SESSION["objetos"])){
                $_SESSION["objetos"] = array();
            }
        }
        
        function guardar($persona)
        {
            $datos = $this->listar();
            $personas = json_decode($datos); 
            array_push($personas,$persona); // NUEVA PERSONA
            
            $archivo = fopen("./archivo.txt", "w");
            $rta=fwrite($archivo, json_encode($personas));
            $rta2=fclose($archivo);
            //array_push($_SESSION["Personas"], $alumno);
        }


        function borrar($personaLegajo){
            foreach($_SESSION["objetos"] as $key => $persona){
                if($persona->legajo == $personaLegajo){
                    unset($_SESSION["objetos"][$key]);
                }
            }
        }

        function listar(){
            $arrayPersona = array();
            $archivo = fopen("./archivo.txt", "r");
            while(!feof($archivo))
            {
                //echo fgets($archivo);
                $personaAux = explode(' - ', fgets($archivo));
                if(count($personaAux) > 1)
                {
                    $persona = new Persona($personaAux[0], $personaAux[1], $personaAux[2]);
                    //$persona->saludar();
                    array_push($arrayPersona, $persona);
                    //echo json_encode($arrayPersona);
                }
            }
            //$arrayAux = json_encode($_SESSION["Personas"]);
            $datos = json_encode($arrayPersona); 
            fclose($archivo);
            echo $datos;
            return $datos;
        }
        function modificar($personaLegajo, $personaNombre){
            foreach($_SESSION["objetos"] as $key => $persona){
                if($persona->legajo == $personaLegajo){
                    $persona->nombre = $personaNombre;
                }
            }
        }
    }
?>