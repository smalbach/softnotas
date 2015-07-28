<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class abonos_model extends CI_Controller{

    function __construct(){
        parent::__construct();

    }

    function guardar($data){

        return $this->db->insert('abonos',$data);

    }

    //busqueda de estudiantes
    function buscarestudiante($identificacion){


        $query = $this->db->query("SELECT eg.id, e.identificacion as label , e.identificacion as value, concat_ws(' ', e.nombres, e.apellidos) as nombre, c.curso as curso, j.jornada as jornada
                                   FROM estudiantes e, estudiantes_grupo eg, grupos g, jornadas j, cursos c
                                   WHERE e.id = eg.estudiante_id AND eg.grupo_id = g.id AND g.curso_id = c.id AND g.jornada_id = j.id AND e.identificacion LIKE '%$identificacion%'");


        if($query->num_rows()>0){

            foreach ($query->result_array() as $row){

                $data[]=$row;

            }

        }else{

            return false;

        }

        return  $data;

    }

    function buscarestudiante2($identificacion2){

        $query = $this->db->query("SELECT eg.id as id, e.nombres as nombres, e.apellidos as apellidos, c.curso as curso, j.jornada as jornada, eg.total as total, sum(a.abono) as abono
                                   FROM estudiantes e, estudiantes_grupo eg, grupos g, jornadas j, cursos c, abonos a
                                   WHERE e.id = eg.estudiante_id AND eg.grupo_id = g.id AND g.curso_id = c.id AND g.jornada_id = j.id AND eg.id = a.estudiante_grupo_id AND eg.id = '$identificacion2'
                                   GROUP BY a.estudiante_grupo_id");


        if($query->num_rows()>0){

            $estudiante = new stdClass();

            foreach ($query->result_array() as $row){

                $estudiante->id = $row['id'];
                $estudiante->nombre = $row['nombres'].' '.$row['apellidos'];
                $estudiante->curso = $row['curso'];
                $estudiante->jornada = $row['jornada'];
                $estudiante->mora = $row['total'] - $row['abono'];

            }

        }else{

            return false;

        }

        return  $estudiante;
    }


}
?>