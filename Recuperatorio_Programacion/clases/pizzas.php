<?php
class Pizza
{
    public $id;
    public $precio;
    public $tipo;
    public $cantidad;
    public $sabor;
    public $imagenUno;
    public $imagenDos;

    public function __construct($precio, $tipo, $cantidad, $sabor, $imagenUno, $imagenDos, $id)
    {
        $this->id = $id;
        $this->precio = $precio;
        $this->tipo = $tipo;
        $this->cantidad = $cantidad;
        $this->sabor = $sabor;
        $this->imagenUno = $imagenUno;
        $this->imagenDos = $imagenDos;
    }
}
