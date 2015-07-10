<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class estudiantes extends CI_Controller {
    var $ses;
    function __construct(){
         parent::__construct();

         $this->load->model('estudiantes_model');
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

    function ingresoestudiantes(){
        $data["ses"]=$this->ses;
        $data["body"]='estudiantes/ingresoestudiantes';
        $this->load->view('includes/tpl_admin',$data);
    }

    function guardar(){
        if($this->input->is_ajax_request()){
            $data = array(
                'identificacion' =>$this->input->post('identificacion'),
                'expedicion' =>$this->input->post('expedicion'),
                'nombres' =>$this->input->post('nombres'),
                'apellidos' =>$this->input->post('apellidos'),
                'sexo' =>$this->input->post('sexo'),
                'fecha_nacimiento' =>$this->input->post('fecha_nacimiento'),
                'direccion' =>$this->input->post('direccion'),
                'telefono' =>$this->input->post('telefono'),
                'alergias' =>$this->input->post('alergias'),
                'eps' =>$this->input->post('eps'),
                'peso' =>$this->input->post('peso'),
                'rh' =>$this->input->post('rh')
            );
            header('Content-Type: application/json');
            echo json_encode($this->estudiantes_model->crearestudiante($data));



        }else{


        }




    }
}

?>