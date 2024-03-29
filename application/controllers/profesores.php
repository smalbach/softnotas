<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class profesores extends CI_Controller {
    var $ses;
    function __construct(){
         parent::__construct();

         $this->load->model('profesores_model');
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
        $data["body"]='profesores/ingresar';
        $this->load->view('includes/tpl_admin',$data);
    }

    function buscar(){
        $identificacion = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->profesores_model->buscar($identificacion));

    }

    function buscar2(){
        $identificacion2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->profesores_model->buscar2($identificacion2));

    }

    function guardar(){
        if($this->input->is_ajax_request()){
            $data = array(
                'identificacion' =>$this->input->post('identificacion'),
                'tipo_identificacion' =>$this->input->post('tipo_identificacion'),
                'nombres' =>$this->input->post('nombres'),
                'apellidos' =>$this->input->post('apellidos'),
                'sexo' =>$this->input->post('sexo'),
                'fecha_nacimiento' =>$this->input->post('fecha_nacimiento'),
                'direccion' =>$this->input->post('direccion'),
                'telefono' =>$this->input->post('telefono')
            );
            header('Content-Type: application/json');
            echo json_encode($this->profesores_model->guardar($data));

        }else{
        }
    }

}


?>