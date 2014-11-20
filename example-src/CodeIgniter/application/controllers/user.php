<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->load->library('Senchaproxy');
		$this->load->library('form_validation');
		$this->load->model('usermodel');
	}

	function read()
	{
        $start  = $this->input->get_post('start', TRUE);
        $limit  = $this->input->get_post('limit', TRUE);
        $sort   = $this->input->get_post('sort', TRUE);
        $filter = $this->input->get_post('filter', TRUE);
        $search	= $this->input->get_post('query', TRUE);

        $property = null;
        $direction = null;
        $active_filter = false;

        // get sort params
        $sort_array = json_decode($sort);
        if (count($sort_array) > 0)
        {
            $property = $sort_array[0]->property;
            $direction = $sort_array[0]->direction;
        }

		$filters = json_decode($filter);

        $result = $this->usermodel->enumerate($start,$limit,$property,$direction,$filters,$search);

        $this->senchaproxy->sendResponse($result);
	}

    function create()
    {
		$this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
		$this->form_validation->set_rules('name', 'Name', 'trim|xss_clean');
		$this->form_validation->set_rules('surname', 'Last name', 'trim|xss_clean');
		$this->form_validation->set_rules('email', 'Email address', 'trim|required|valid_email|xss_clean');

        if ($this->form_validation->run()==FALSE) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'Errors were encountered with your request.  Please correct them and try again.',
                'errors'    => validation_errors()
            );
        } 
        else 
        {
			// return all POST items with XSS filter
            $data = $this->input->post(NULL, TRUE); 

            // get result
            $result = $this->usermodel->create_record($data);
        }
        $this->senchaproxy->sendResponse($result);
	}

    function update()
    {
		$this->form_validation->set_rules('id', 'ID', 'trim|required|xss_clean');
		$this->form_validation->set_rules('username', 'Username', 'trim|callback__required_if_sent[username]|xss_clean');
		$this->form_validation->set_rules('email', 'Email address', 'trim|callback__required_if_sent[email]|valid_email|xss_clean');
		$this->form_validation->set_rules('name', 'Name', 'trim|xss_clean');
		$this->form_validation->set_rules('surname', 'Last name', 'trim|xss_clean');

        if ($this->form_validation->run()==FALSE) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'Errors were encountered with your request.  Please correct them and try again.',
                'errors'    => validation_errors(),
            );
        } 
        else 
        {
			// return all POST items with XSS filter
            $data = $this->input->post(NULL, TRUE);

			if (count($data)>1)
			{
            	$result = $this->usermodel->update_record($data);
			}
			else
			{
				$result = array (
					'success'   => false,
					'msg'       => 'No updates attempted.'
            	);
			}
        }
        $this->senchaproxy->sendResponse($result);
	}

    function destroy()
    {
        $this->form_validation->set_rules('id', 'Record ID', 'trim|required|numeric|xss_clean');

		// create array from post data
		$data = $this->input->post(NULL, TRUE);

        if (!$this->form_validation->run()) 
        {
            $result = array (
                'success'   => false,
                'msg'       => $this->CI->lang->line('appunto_errors_encountered'),
                'errors'    => validation_errors()
            );
        } 
        else 
        {
            $result = $this->usermodel->delete_record($data);
        }
        $this->senchaproxy->sendResponse($result);
	}

	function db_error()
	{
        $this->load->database();

		$query = $this->db->query('SELECT name, title, email FROM table_that_does_not_exist');

		$result = $query->result();

	}
	
	function ci_error()
	{
		$this->load->library('Fake_library_class_that_does_not exist');
	}
	
	function _required_if_sent($val,$field)
	{

		if ($this->input->post($field)!==false) //boolean false if not sent at all, which is ok
		{
			if (empty($val))
			{
				$this->form_validation->set_message('_required_if_sent', 'The %s field can not be blank');
				return false;
			}
		}
		return true;
	}
}
/* End of file user.php */
/* Location: ./application/controllers/user.php */
