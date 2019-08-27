<?php

class Persona
{    
    // Atributos
    public $nombre;
    public $dni;
    
    // Constructor
    public function __construct($nombre, $dni){
        $this->nombre = $nombre;
        $this->dni = $dni;
    }

    public function saludar()
    {
        echo "<br/>Hola:", $this->nombre;
    }

}


?>

<?php

 $persona = new Persona("Pepito",55123123);

 $persona->saludar();

?>
