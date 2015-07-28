<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class estudiantes_model extends CI_Controller{

    function __construct(){
        parent::__construct();

    }

    function guardar($data){

        return $this->db->insert('estudiantes',$data);

    }




    function buscar($identificacion){


        $query = $this->db->query("SELECT id, identificacion as label , identificacion as value, concat_ws(' ', nombres, apellidos) as nombre FROM estudiantes WHERE identificacion LIKE '%$identificacion%'");


        if($query->num_rows()>0){

            foreach ($query->result_array() as $row){

                $data[]=$row;
            }

        }else{
            return false;
        }

        return  $data;
    }

    function buscar2($identificacion2){

        $query = $this->db->query("SELECT id, tipo_identificacion, nombres, apellidos, sexo, fecha_nacimiento, telefono, direccion FROM estudiantes WHERE id = '$identificacion2'");


        if($query->num_rows()>0){

            $estudiante = new stdClass();

            foreach ($query->result_array() as $row){

                $estudiante->tipo_identificacion = $row['tipo_identificacion'];
                $estudiante->nombres = $row['nombres'];
                $estudiante->apellidos = $row['apellidos'];
                $estudiante->sexo = $row['sexo'];
                $estudiante->fecha_nacimiento = $row['fecha_nacimiento'];
                $estudiante->telefono = $row['telefono'];
                $estudiante->direccion = $row['direccion'];

            }

        }else{

            return false;

        }

        return  $estudiante;
    }


}
?>