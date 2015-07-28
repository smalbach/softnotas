<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class abonos extends CI_Controller {
    var $ses;
    function __construct(){
         parent::__construct();

         $this->load->model('abonos_model');
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
        $data["body"]='abonos/ingresar';
        $this->load->view('includes/tpl_admin',$data);
    }

    function buscarestudiante(){
        $identificacion = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->abonos_model->buscarestudiante($identificacion));

    }

    function buscarestudiante2(){
        $identificacion2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->abonos_model->buscarestudiante2($identificacion2));

    }

    function guardar(){
        if($this->input->is_ajax_request()){
            $data = array(
                'estudiante_grupo_id' =>$this->input->post('estudiante_grupo_id'),
                'fecha' =>$this->input->post('fecha'),
                'abono' =>$this->input->post('abono'),
            );
            header('Content-Type: application/json');
            echo json_encode($this->abonos_model->guardar($data));

        }else{
        }
    }

}


?>