<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class cordinadores_model extends CI_Controller{

    function __construct(){
        parent::__construct();

    }

    function guardar($data){

        return $this->db->insert('cordinadores',$data);

    }

    //busqueda de profesores
    function buscarprofesor($identificacion){


        $query = $this->db->query("SELECT profesor_id, identificacion as label , identificacion as value FROM profesores WHERE identificacion LIKE '%$identificacion%'");


        if($query->num_rows()>0){

            foreach ($query->result_array() as $row){

                $data[]=$row;
            }

        }else{
            return false;
        }

        return  $data;
    }

    function buscarprofesor2($identificacion2){

        $query = $this->db->query("SELECT profesor_id, nombres, apellidos FROM profesores WHERE profesor_id = '$identificacion2'");


        if($query->num_rows()>0){

            $profesor = new stdClass();

            foreach ($query->result_array() as $row){

                $profesor->profesor_id = $row['profesor_id'];
                $profesor->nombre = $row['nombres'].' '.$row['apellidos'];

            }

        }else{

            return false;

        }

        return  $profesor;
    }


    //busqueda de cursos
    function buscarcurso($curso){


        $query = $this->db->query("SELECT curso_id, nombre as label , nombre as value FROM cursos WHERE nombre LIKE '%$curso%'");


        if($query->num_rows()>0){

            foreach ($query->result_array() as $row){

                $data[]=$row;
            }

        }else{

            return false;

        }

        return  $data;
    }


    function buscarcurso2($curso2){

        $query = $this->db->query("SELECT curso_id, nombre, detalle FROM cursos WHERE curso_id = '$curso2'");


        if($query->num_rows()>0){

            $curso = new stdClass();

            foreach ($query->result_array() as $row){

                $curso->curso_id = $row['curso_id'];
                $curso->detalle = $row['detalle'];

            }

        }else{

            return false;

        }

        return  $curso;

    }


}
?>