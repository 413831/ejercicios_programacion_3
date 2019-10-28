<?php
class cdApi
{
    public $alumnos;

    public function __construct()
    {

    }

    public function funcionPost($request, $response, $args)
    {
        $response->getbody()->write("</br>Dentro del POST");
        return $response->getbody()->write("</br>REQUEST POST");
    }
    
    public function funcionGet($request, $response, $args)
    {
        $response->getbody()->write("</br>Dentro del GET");
        return $response->getbody()->write("</br>REQUEST GET");
    }

}
