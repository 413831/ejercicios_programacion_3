<?php
namespace App\Models\ORM;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Inscripcion extends \Illuminate\Database\Eloquent\Model {
  protected $alumno;
  protected $usuario;
  protected $id;
  protected $table = 'inscripciones';

}
