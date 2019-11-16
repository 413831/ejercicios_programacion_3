<?php
namespace App\Models\ORM;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class usuario extends \Illuminate\Database\Eloquent\Model {
  protected $tipo;
  protected $id_tipo;
  protected $nombre;
  protected $clave;
  protected $email;
  protected $legajo;

}
