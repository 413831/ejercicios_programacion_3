<?php
include "./clases/alumno.php";
include "./clases/materias.php";
include "./clases/inscripciones.php";
include "./clases/dao.php";
include "./controller/controller.php";

$request = $_SERVER["REQUEST_METHOD"];

try {
  switch ($request)
  {
    case 'POST':
      if(isset($_POST["case"]))
      {
        switch ($_POST["case"])
        {
          case 'cargarAlumno':
              if(isset($_POST["nombre"]) && isset($_POST["apellido"]) && isset($_POST["email"]) && isset($_FILES["foto"]))
              {
               Controller::cargarAlumno($_POST["nombre"],$_POST["apellido"],$_POST["email"],$_FILES["foto"],'./alumnos.txt');
              }
              else {
                echo "Datos incompletos.";
              }
            break;
          case 'modificarAlumno':
              if(isset($_POST["email"])){
                Controller::modificarAlumno($_POST,$_FILES,"./alumnos.txt");
              }
              break;
          case 'cargarMateria':
                // code...
                break;
          default:
            // code...
            break;
        }

      }


      // code...
      break;
    case 'GET':
        if(isset($_GET["case"]))
        {
          switch ($_GET["case"])
          {
            case 'inscribirAlumno':
              // code...
              break;
            case 'consultarAlumno':
              // code...
              break;
            case 'alumnos':
                // code...
                break;
            case 'inscripciones':
                  // code...
                  break;
            default:
              // code...
              break;
          }

        }
        break;
    default:
      // code...
      break;
  }

} catch (Exception $e) {

  echo $e->getMessage();


}



 ?>
