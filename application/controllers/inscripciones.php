<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class inscripciones extends CI_Controller {
    var $ses;
    function __construct(){
         parent::__construct();

         $this->load->model('inscripciones_model');
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
        $data["body"]='inscripciones/ingresar';
        $this->load->view('includes/tpl_admin',$data);
    }

    function buscarestudiante(){
        $identificacion = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->inscripciones_model->buscarestudiante($identificacion));

    }

    function buscarestudiante2(){
        $identificacion2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->inscripciones_model->buscarestudiante2($identificacion2));

    }

    function buscargrupo(){
        $grupo = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->inscripciones_model->buscargrupo($grupo));

    }

    function buscargrupo2(){
        $grupo2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->inscripciones_model->buscargrupo2($grupo2));

    }

    function guardar(){
        if($this->input->is_ajax_request()){
            $data = array(
                'grupo_id' =>$this->input->post('grupo_id'),
                'estudiante_id' =>$this->input->post('estudiante_id'),
                'total' =>$this->input->post('total'),
                'descuento' =>$this->input->post('descuento'),
                'fecha' =>$this->input->post('fecha'),
                'abono_inicial' =>$this->input->post('abono_inicial')

            );
            header('Content-Type: application/json');
            echo json_encode($this->inscripciones_model->guardar($data));

        }else{
        }
    }

}


?>