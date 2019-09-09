<?php 
 
    $nombre = "Alejandro";
    $apellido = " Planes";
    $x = -3;
    $y = 15;
    $contador;
    $acumulador = 0;

    echo $nombre.$apellido;
    
    echo "<br/>Valor X: ", $x;
    echo "<br/>Valor Y: ", $y;
    echo "<br/>Resultado: ", $x + $y;
    
    for($contador = 0;$contador < 1000;$contador++)
    {
        $acumulador += $contador;
    }
    echo "<br/>Suma total: ", $acumulador;
    echo "<br/>Numeros totales: ", $contador;
    
?>