<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class areas extends CI_Controller {
    var $ses;
    function __construct(){
         parent::__construct();

         $this->load->model('areas_model');
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

    function ingresoareas(){
        $data["ses"]=$this->ses;
        $data["body"]='areas/ingresoareas';
        $this->load->view('includes/tpl_admin',$data);
    }

    function buscar(){
        $area = $_GET['area'];
        header('Content-Type: application/json');
        echo json_encode($this->areas_model->buscararea($area));

    }

    function buscar2(){
        $area2 = $_POST['area'];
        header('Content-Type: application/json');
        echo json_encode($this->areas_model->buscararea2($area2));

    }

    function guardar(){
        if($this->input->is_ajax_request()){
            $data = array(
                'area' =>$this->input->post('area'),
                'detalle' =>$this->input->post('detalle')
            );
            header('Content-Type: application/json');
            echo json_encode($this->areas_model->creararea($data));



        }else{


        }




    }
}

?>