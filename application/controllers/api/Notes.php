<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Notes extends REST_Controller {
    
    function __construct() {
        // Construct the parent class
        parent::__construct();
    }
    
    public function all_get(){
        $this->response($this->coreapp->notes->get_all_notes());
    }
    
    public function save_post(){
        $this->response($this->coreapp->notes->save_note());
    }
    
    public function delete_post(){
        $this->response($this->coreapp->notes->delete_note());
    }
    
    public function getNote_post(){
        $this->response($this->coreapp->notes->get_note());
    }
}