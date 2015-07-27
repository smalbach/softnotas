<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class inscripciones_model extends CI_Controller{

    function __construct(){
        parent::__construct();

    }

    function guardar($data){

        return $this->db->insert('estudiantes_grupo',$data);

    }

    //busqueda de estudiantes
    function buscarestudiante($identificacion){


        $query = $this->db->query("SELECT id, identificacion as label , identificacion as value, nombres as nombres FROM estudiantes WHERE identificacion LIKE '%$identificacion%'");


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

        $query = $this->db->query("SELECT id, nombres, apellidos FROM estudiantes WHERE id = '$identificacion2'");


        if($query->num_rows()>0){

            $estudiante = new stdClass();

            foreach ($query->result_array() as $row){

                $estudiante->id = $row['id'];
                $estudiante->nombre = $row['nombres'].' '.$row['apellidos'];

            }

        }else{

            return false;

        }

        return  $estudiante;
    }


    //busqueda de grupos
    function buscargrupo($grupo){


        $query = $this->db->query("SELECT g.id AS id, c.curso as label , c.curso as value, j.jornada FROM grupos g, cursos c, jornadas j WHERE c.id = g.curso_id  AND g.jornada_id = j.id AND c.curso LIKE '%$grupo%'");


        if($query->num_rows()>0){

            foreach ($query->result_array() as $row){

                $data[]=$row;
            }

        }else{

            return false;

        }

        return  $data;
    }


    function buscargrupo2($grupo2){

        $query = $this->db->query("SELECT g.id AS id, j.jornada AS jornada, g.valor AS valor FROM grupos g, cursos c, jornadas j WHERE c.id = g.curso_id AND g.jornada_id = j.id AND g.id = '$grupo2'");


        if($query->num_rows()>0){

            $grupo = new stdClass();

            foreach ($query->result_array() as $row){

                $grupo->id = $row['id'];
                $grupo->jornada = $row['jornada'];
                $grupo->valor = $row['valor'];

            }

        }else{

            return false;

        }

        return  $grupo;

    }


}
?>