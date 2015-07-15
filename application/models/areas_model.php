<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class areas_model extends CI_Controller
{
    function __construct(){
        parent::__construct();
    }

    function creararea($data){
        return $this->db->insert('areas',$data);

    }


    function buscararea($area){

        $query = $this->db->query("SELECT *  FROM areas WHERE area='$area'");

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