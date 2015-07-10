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

    function ingresoprofesores(){
        $data["ses"]=$this->ses;
        $data["body"]='profesores/ingresoprofesores';
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
                'estado_civil' =>$this->input->post('estado_civil'),
                'email' =>$this->input->post('email'),
                'cargo' =>$this->input->post('cargo'),
                'fech_ingreso' =>$this->input->post('fech_ingreso'),
                'escalafon' =>$this->input->post('escalafon'),
                'resolucion' =>$this->input->post('resolucion'),
                'nivel_escolar' =>$this->input->post('nivel_escolar'),
                'asignacion' =>$this->input->post('asignacion')
            );
            header('Content-Type: application/json');
            echo json_encode($this->profesores_model->crearprofesores($data));



        }else{


        }




    }
}

?>