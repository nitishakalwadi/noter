<?php  if(!defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends MY_Model
{
	public function __construct(){
        $this->table = 'users';
        $this->primary_key = 'id';
        
        //disable default timestamps
        $this->timestamps = FALSE;
        
        parent::__construct();
	}
}