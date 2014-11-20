<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Example extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	function index()
	{

		$this->load->library('senchaproxy');
		$this->load->helper('senchaproxy');

		$this->load->view('example');

	}
}

/* End of file example.php */
/* Location: ./application/controllers/example.php */
