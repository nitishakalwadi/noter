<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	public function index()
	{
		echo json_encode($this->coreapp->auth->login());
	}
}
