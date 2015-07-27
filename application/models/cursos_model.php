<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class cursos_model extends CI_Controller{

    function __construct(){
        parent::__construct();

    }

    function guardar($data){

        return $this->db->insert('cursos',$data);

    }


    function buscar($curso){


        $query = $this->db->query("SELECT id, nombre as label , nombre as value FROM cursos WHERE nombre LIKE '%$curso%'");


        if($query->num_rows()>0){

            foreach ($query->result_array() as $row){

                $data[]=$row;
            }

        }else{

            return false;

        }

        return  $data;
    }


    function buscar2($curso2){

        $query = $this->db->query("SELECT id, nombre, detalle FROM cursos WHERE id = '$curso2'");


        if($query->num_rows()>0){

            $curso = new stdClass();

            foreach ($query->result_array() as $row){

                $curso->nombre = $row['nombre'];
                $curso->detalle = $row['detalle'];

            }

        }else{

            return false;

        }

        return  $curso;

    }


}
?>