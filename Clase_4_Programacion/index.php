<?php
    INCLUDE './Clases/Persona.php';
    INCLUDE './Clases/IO.php';
    $request = ($_SERVER['REQUEST_METHOD']);
    $dao = new IO('./texto.txt');

    switch($request){
        case "POST" : 
        var_dump($_POST);
        var_dump($_FILES);
            if(isset($_POST["Nombre"]) && isset($_POST["Apellido"]) && isset($_POST["Legajo"])) {
                $persona = new Persona($_POST["Nombre"], $_POST["Apellido"], $_POST["Legajo"]);
                $dao->guardar($persona);
                $dao->guardarImagen("Imagen","./",$persona->legajo);
            }
            break;
        case "GET" : 
            echo $dao->listar();
            break;
        
    }

?>