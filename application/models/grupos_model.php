<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class grupos_model extends CI_Controller{

    function __construct(){
        parent::__construct();

    }

    function guardar($data){

        return $this->db->insert('grupos',$data);

    }

    //busqueda de cursos
    function buscarcurso($curso){


        $query = $this->db->query("SELECT id, curso as label , curso as value FROM cursos WHERE curso LIKE '%$curso%'");


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

        $query = $this->db->query("SELECT id, curso, detalle FROM cursos WHERE id = '$curso2'");


        if($query->num_rows()>0){

            $curso = new stdClass();

            foreach ($query->result_array() as $row){

                $curso->id = $row['id'];
                $curso->curso = $row['curso'];
                $curso->detalle = $row['detalle'];

            }

        }else{

            return false;

        }

        return  $curso;
    }


    //busqueda de jornada
    function buscarjornada($jornada){


        $query = $this->db->query("SELECT id, jornada as label , jornada as value FROM jornadas WHERE jornada LIKE '%$jornada%'");


        if($query->num_rows()>0){

            foreach ($query->result_array() as $row){

                $data[]=$row;
            }

        }else{

            return false;

        }

        return  $data;
    }


    function buscarjornada2($jornada2){

        $query = $this->db->query("SELECT id, jornada FROM jornadas WHERE id = '$jornada2'");


        if($query->num_rows()>0){

            $jornada = new stdClass();

            foreach ($query->result_array() as $row){

                $jornada->id = $row['id'];
                $jornada->jornada = $row['jornada'];

            }

        }else{

            return false;

        }

        return  $jornada;

    }


    //busqueda de año
    function buscaranio($anio){


        $query = $this->db->query("SELECT id, anio as label , anio as value FROM anios WHERE anio LIKE '%$anio%'");


        if($query->num_rows()>0){

            foreach ($query->result_array() as $row){

                $data[]=$row;
            }

        }else{

            return false;

        }

        return  $data;
    }


    function buscaranio2($anio2){

        $query = $this->db->query("SELECT id, anio FROM anios WHERE id = '$anio2'");


        if($query->num_rows()>0){

            $anio = new stdClass();

            foreach ($query->result_array() as $row){

                $anio->id = $row['id'];
                $anio->anio = $row['anio'];

            }

        }else{

            return false;

        }

        return  $anio;

    }


}
?>