<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class asignaciones extends CI_Controller {
    var $ses;
    function __construct(){
         parent::__construct();

         $this->load->model('asignaciones_model');
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
        $data["body"]='asignaciones/ingresar';
        $this->load->view('includes/tpl_admin',$data);
    }

    function buscarprofesor(){
        $identificacion = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->asignaciones_model->buscarprofesor($identificacion));

    }

    function buscarprofesor2(){
        $identificacion2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->asignaciones_model->buscarprofesor2($identificacion2));

    }

    function buscargrupo(){
        $grupo = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->asignaciones_model->buscargrupo($grupo));

    }

    function buscargrupo2(){
        $grupo2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->asignaciones_model->buscargrupo2($grupo2));

    }

    function guardar(){
        if($this->input->is_ajax_request()){
            $data = array(
                'grupo_id' =>$this->input->post('grupo_id'),
                'profesor_id' =>$this->input->post('profesor_id')
            );
            header('Content-Type: application/json');
            echo json_encode($this->asignaciones_model->guardar($data));

        }else{
        }
    }

}


?>