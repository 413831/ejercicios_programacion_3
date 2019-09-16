<?php
    INCLUDE './clases/Persona.php';
    INCLUDE './clases/IO.php';
    $request = ($_SERVER['REQUEST_METHOD']);
    $dao = new IO('./archivo.txt');
    switch($request){
        case "POST" : 
            if(isset($_POST["Nombre"]) && isset($_POST["Apellido"]) && isset($_POST["Legajo"])) {
                $persona = new Persona($_POST["Nombre"], $_POST["Apellido"], $_POST["Legajo"]);
                $dao->guardar($persona);
            }
            break;
        case "GET" : 
            echo $dao->listar();
            break;
        
    }
?>