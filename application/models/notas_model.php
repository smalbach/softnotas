<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class notas_model extends CI_Controller{

    function __construct(){
        parent::__construct();

    }

    function guardar($data){

        return $this->db->insert('notas',$data);

    }


    function buscar($curso){


        $query = $this->db->query("SELECT id, curso as label , curso as value FROM notas WHERE curso LIKE '%$curso%'");


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

        $query = $this->db->query("SELECT id, curso, detalle FROM notas WHERE id = '$curso2'");


        if($query->num_rows()>0){

            $curso = new stdClass();

            foreach ($query->result_array() as $row){

                $curso->curso = $row['curso'];
                $curso->detalle = $row['detalle'];

            }

        }else{

            return false;

        }

        return  $curso;

    }


}
?>