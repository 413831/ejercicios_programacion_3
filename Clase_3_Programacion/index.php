    
<?php
    INCLUDE './Clases/Persona.php';
    INCLUDE './Clases/IO.php';
   // $archivo = fopen("./prueba.txt", "a");
   // $rta=fwrite($archivo,"hol1a");
   // fclose($archivo);
    $request = ($_SERVER['REQUEST_METHOD']);
    $dao = new IO();
switch($request){
    case "POST" : 
       if(isset($_POST["Nombre"]) && isset($_POST["Apellido"]) && isset($_POST["Legajo"]))
        {
            echo "ENTRO";
            $persona = new Persona($_POST["Nombre"], $_POST["Apellido"], $_POST["Legajo"]);
            $dao->guardar($persona);
        }
        echo "SALIO";
        break;
    case "GET" :
        break;
       
        
}
?>