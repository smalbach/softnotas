<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class profesores_model extends CI_Controller{

    function __construct(){
        parent::__construct();

    }

    function guardar($data){

        return $this->db->insert('profesores',$data);

    }




    function buscar($identificacion){


        $query = $this->db->query("SELECT id, identificacion as label , identificacion as value, concat_ws(' ', nombres, apellidos) as nombre FROM profesores WHERE identificacion LIKE '%$identificacion%'");


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

        $query = $this->db->query("SELECT id, tipo_identificacion, nombres, apellidos, sexo, fecha_nacimiento, telefono, direccion FROM profesores WHERE id = '$identificacion2'");


        if($query->num_rows()>0){

            $profesor = new stdClass();

            foreach ($query->result_array() as $row){

                $profesor->tipo_identificacion = $row['tipo_identificacion'];
                $profesor->nombres = $row['nombres'];
                $profesor->apellidos = $row['apellidos'];
                $profesor->sexo = $row['sexo'];
                $profesor->fecha_nacimiento = $row['fecha_nacimiento'];
                $profesor->telefono = $row['telefono'];
                $profesor->direccion = $row['direccion'];

            }

        }else{

            return false;

        }

        return  $profesor;
    }


}
?>