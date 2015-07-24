<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class cordinadores extends CI_Controller {
    var $ses;
    function __construct(){
         parent::__construct();

         $this->load->model('cordinadores_model');
         $newdata = array(
            'usuario'  => 'Jose TRuñon',
            'email'     => 'johndoe@some-site.com',
            'permisos'     => 'administrador',
            'logged_in' => TRUE
            );

        $this->session->set_userdata($newdata);
        $this->ses=$this->session->all_userdata();

     }

    function index(){

    }

    function ingresar(){
        $data["ses"]=$this->ses;
        $data["body"]='cordinadores/ingresar';
        $this->load->view('includes/tpl_admin',$data);
    }

    function buscarprofesor(){
        $identificacion = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->cordinadores_model->buscarprofesor($identificacion));

    }

    function buscarprofesor2(){
        $identificacion2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->cordinadores_model->buscarprofesor2($identificacion2));

    }

    function buscarcurso(){
        $curso = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->cordinadores_model->buscarcurso($curso));

    }

    function buscarcurso2(){
        $curso2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->cordinadores_model->buscarcurso2($curso2));

    }

    function guardar(){
        if($this->input->is_ajax_request()){
            $data = array(
                'curso_id' =>$this->input->post('curso_id'),
                'profesor_id' =>$this->input->post('profesor_id')
            );
            header('Content-Type: application/json');
            echo json_encode($this->cordinadores_model->guardar($data));

        }else{
        }
    }

}


?>