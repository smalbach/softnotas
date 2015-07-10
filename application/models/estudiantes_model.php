<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class estudiantes_model extends CI_Controller
{
    function __construct(){
        parent::__construct();
    }

    function crearprofesores($data){
        return $this->db->insert('estudiant',$data);

    }

}
?>