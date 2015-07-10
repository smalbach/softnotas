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

}
?>