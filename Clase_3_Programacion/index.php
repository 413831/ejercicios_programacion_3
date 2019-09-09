<?php
    INCLUDE './Clases/Persona.php';
   // $archivo = fopen("./prueba.txt", "a");
   // $rta=fwrite($archivo,"hol1a");
   // fclose($archivo);
    $request = ($_SERVER['REQUEST_METHOD']);
    
switch($request){
    case "POST" : 
        if(isset($_POST["Nombre"]) && isset($_POST["Apellido"]))
        {
            $archivo = fopen("./archivo.txt", "a"); // Se abre archivo para agregar a = append
            $rta=fwrite($archivo, PHP_EOL.$_POST["Nombre"]. ' - '. $_POST["Apellido"]); 
            $rta2=fclose($archivo);
        }
        break;
    case "GET" :
        $archivo = fopen("./archivo.txt", "r"); // Se abre un archivo para leer
        while(!feof($archivo))
        {
            //echo fgets($archivo);
            $personaAux = explode(' - ', fgets($archivo));
            $persona = new Persona($personaAux[0], $personaAux[1]);
            $persona->saludar();
            echo "Array size: ".count($personaAux);
        }
        $rta2=fclose($archivo);
        break;      
}
?>