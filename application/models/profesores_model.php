<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class profesores_model extends CI_Controller
{
    function __construct(){
        parent::__construct();
    }

    function crearprofesores($data){
        return $this->db->insert('profesores',$data);

    }

    function buscarprofesor($identificacion){

        $query = $this->db->query("SELECT *  FROM profesores WHERE identificacion='$identificacion'");

        if($query->num_rows()>0){

            foreach ($query->result_array() as $row){

                $data[]=$row;
            }

        }else{
            return false;
        }
        return  $data;

    }

}
?>