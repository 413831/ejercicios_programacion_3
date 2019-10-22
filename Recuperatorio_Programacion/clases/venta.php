<?php
class Venta
{
    public $id;
    public $email;
    public $tipo;
    public $cantidad;
    public $sabor;

    public function __construct($id, $email,$precio, $tipo, $cantidad, $sabor)
    {
        $this->id = $id;
        $this->precio = $precio;
        $this->tipo = $tipo;
        $this->cantidad = $cantidad;
        $this->sabor = $sabor;
    }
}