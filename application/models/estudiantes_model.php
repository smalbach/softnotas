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


        $query = $this->db->query("SELECT estudiante_id, identificacion as label , identificacion as value FROM estudiantes WHERE identificacion LIKE '%$identificacion%'");


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

        $query = $this->db->query("SELECT estudiante_id, nombres, apellidos, sexo, fecha_nacimiento, telefono, direccion FROM estudiantes WHERE estudiante_id = '$identificacion2'");


        if($query->num_rows()>0){

            $estudiante = new stdClass();

            foreach ($query->result_array() as $row){

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