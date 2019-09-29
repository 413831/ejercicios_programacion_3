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
              if(isset($_POST["nombre"]) && isset($_POST["codigo"]) && isset($_POST["cupo"]) && isset($_POST["aula"]))
              {
               Controller::cargarMateria($_POST["nombre"],$_POST["codigo"],$_POST["cupo"],$_POST["aula"],'./materias.txt');
              }
              else {
                echo "Datos incompletos.";
              }
                break;
          default:
            echo "Case incorrecto";
            break;
        }
      }
      break;
    case 'GET':
        if(isset($_GET["case"]))
        {
          switch ($_GET["case"])
          {
            case 'inscribirAlumno':
              if(isset($_GET["nombreAlumno"]) && isset($_GET["apellidoAlumno"]) && isset($_GET["emailAlumno"]) &&
                  isset($_GET["nombreMateria"]) && isset($_GET["codigoMateria"]))
              {
                Controller::inscribirAlumno($_GET["nombreAlumno"],$_GET["apellidoAlumno"],$_GET["emailAlumno"],
                                            $_GET["nombreMateria"],$_GET["codigoMateria"],
                                            './materias.txt','./alumnos.txt','./inscripciones.txt');
              }
              break;
            case 'consultarAlumno':
              if(isset($_GET["apellido"]))
              {
                echo Controller::consultarAlumno($_GET["apellido"],'./alumnos.txt');
              }
              break;
            case 'alumnos':
                echo Controller::mostrarAlumnos('./alumnos.txt');
                break;
            case 'inscripciones':
                  echo Controller::mostrarInscripciones($_GET,'./inscripciones.txt');
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
