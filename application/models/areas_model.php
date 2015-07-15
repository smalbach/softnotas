<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class areas_model extends CI_Controller
{
    function __construct(){
        parent::__construct();
    }

    function creararea($data){
        return $this->db->insert('areas',$data);

    }


    function buscararea($area){


        $query = $this->db->query("SELECT *  FROM areas WHERE area LIKE '%$area%'");


        if($query->num_rows > 0){
            while($fila = $query->fetch_array()){
                $area[] = $fila['area'];
            }
            echo json_encode($area);
        }

    }

    function buscararea2($area2){

        $query = $this->db->query("SELECT *  FROM areas WHERE area = '$area2'");

        $respuesta = new stdClass();
        if($query->num_rows()>0){
            $fila = $query->fetch_array();
            $respuesta->area = $fila['area'];
            $respuesta->detalle = $fila['detalle'];
        }
        echo json_encode($respuesta);
    }



}
?>