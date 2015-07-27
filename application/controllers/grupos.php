<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class grupos extends CI_Controller {
    var $ses;
    function __construct(){
         parent::__construct();

         $this->load->model('grupos_model');
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
        $data["body"]='grupos/ingresar';
        $this->load->view('includes/tpl_admin',$data);
    }

    function buscarcurso(){
        $curso = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->grupos_model->buscarcurso($curso));

    }

    function buscarcurso2(){
        $curso2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->grupos_model->buscarcurso2($curso2));

    }

    function buscarjornada(){
        $jornada = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->grupos_model->buscarjornada($jornada));

    }

    function buscarjornada2(){
        $jornada2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->grupos_model->buscarjornada2($jornada2));

    }


    function buscaranio(){
        $anio = $this->input->get('term');
        header('Content-Type: application/json');
        echo json_encode($this->grupos_model->buscaranio($anio));

    }

    function buscaranio2(){
        $anio2 = $this->input->get('id');
        header('Content-Type: application/json');
        echo json_encode($this->grupos_model->buscaranio2($anio2));

    }


    function guardar(){
        if($this->input->is_ajax_request()){
            $data = array(
                'curso_id' =>$this->input->post('curso_id'),
                'jornada_id' =>$this->input->post('jornada_id'),
                'anio_id' =>$this->input->post('anio_id'),
                'valor' =>$this->input->post('valor')
            );
            header('Content-Type: application/json');
            echo json_encode($this->grupos_model->guardar($data));

        }else{
        }
    }

}


?>