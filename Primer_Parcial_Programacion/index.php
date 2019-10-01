<?php
include "./clases/log.php";
include "./clases/usuario.php";
include "./clases/dao.php";
include "./clases/controller.php";

$request = $_SERVER["REQUEST_METHOD"];

try {
  switch ($request)
  {
      case 'POST':
        if(isset($_POST["case"]))
        {
            switch($_POST["case"])
            {
                case 'cargarUsuario':
                    if(isset($_POST["legajo"]) && isset($_POST["nombre"]) && isset($_POST["clave"]) &&
                        isset($_POST["email"]) && isset($_FILES["fotoUno"]) && isset($_FILES["fotoDos"]))
                    {
                        Controller::cargarUsuario($_POST["nombre"],$_POST["legajo"],$_POST["email"],
                                                $_POST["clave"],$_FILES["fotoUno"],$_FILES["fotoDos"],'./usuarios.json');
                    }
                    else {
                    echo "Datos incompletos.";
                    }
                break;
                case 'modificarUsuario':
                    if(isset($_POST["legajo"]) && isset($_POST["clave"]))
                    {
                        Controller::modificarUsuario($_POST,$_FILES,'./usuarios.json');
                    }
                    else {
                         echo "Datos incompletos.";
                    }
                break;
            }
        }  
    case 'GET':
        if(isset($_GET["case"]))
        {
            switch($_GET["case"])
            {
                case 'login':              
                    if(isset($_GET["legajo"]) && isset($_GET["clave"]))
                    {
                        echo Controller::login($_GET["legajo"],$_GET["clave"],'./usuarios.json');
                    }
                    else {
                    echo "Datos incompletos.";
                    }
                break;
                case 'verUsuarios':              

                    echo Controller::verUsuarios('./usuarios.json');

                break;
                case 'verUsuario':              
                if(isset($_GET["legajo"]))
                {
                    echo Controller::verUsuario($_GET["legajo"],'./usuarios.json');
                }
                    

                break;
            }
        }      
    break;  
    
  } 
    $hora = getdate();
     if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $request = $_POST;
    }
    else if($_SERVER["REQUEST_METHOD"] == "GET")
    {
        $request = $_GET;
    }
     Controller::registro($request["case"],$hora,$_SERVER['REMOTE_ADDR'],'./info.log');
} catch (Exception $e) {
  echo json_encode(array('mensaje' => $e->getMessage()));
}



 ?>
