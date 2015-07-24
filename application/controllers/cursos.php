<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class cursos extends CI_Controller {
    var $ses;
    function __construct(){
         parent::__construct();

         $this->load->model('cursos_model');
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
        $data["body"]='cursos/ingresar';
        $this->load->view('includes/tpl_admin',$data);
    }

    function buscar(){
        $curso = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->cursos_model->buscar($curso));

    }

    function buscar2(){
        $curso2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->cursos_model->buscar2($curso2));

    }

    function guardar(){
        if($this->input->is_ajax_request()){
            $data = array(
                'nombre' =>$this->input->post('nombre'),
                'detalle' =>$this->input->post('detalle')
            );
            header('Content-Type: application/json');
            echo json_encode($this->cursos_model->guardar($data));

        }else{
        }
    }

}


?>