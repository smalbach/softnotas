<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class estudiantes_model extends CI_Controller
{
    function __construct(){
        parent::__construct();
    }

    function crearestudiante($data){
        return $this->db->insert('estudiantes',$data);

    }


    function buscarestudiante($identificacion){

        $query = $this->db->query("SELECT *  FROM estudiantes WHERE identificacion='$identificacion'");

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