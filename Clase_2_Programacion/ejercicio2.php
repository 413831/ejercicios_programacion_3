<?php
  
  $a = 6;
  $b = 8;
  $c = 2;

    if($a > $b && $a < $c || $a < $b && $a > $c)
    {
        echo "<br/>Valor medio: ",$a;
    }
    else if($b > $a && $b < $c || $b < $a && $b > $c)
    {
        echo "<br/>Valor medio: ",$b;
    }
    else if($c > $a && $c < $b || $c < $a && $c > $b)
    {
        echo "<br/>Valor medio: ",$c;
    }
    else
    {
        echo "<br/>No hay valor medio";
    }

?>