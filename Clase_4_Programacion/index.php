<?php

var_dump($_POST);
var_dump($_FILES);

$imagen = $_FILES["Penguin"]["tmp_name"];

move_uploaded_file($imagen,"./pinguinito.jpg");

?>