<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Noter extends CI_Controller {

	public function index()
	{
		$this->load->view('home');
	}
	
	public function register()
	{
		$this->load->view('register');
	}
}
