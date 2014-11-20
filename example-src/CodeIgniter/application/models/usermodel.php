<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Usermodel extends CI_Model 
{

	function __construct()
	{
		parent::__construct();

		$this->load->library('Senchaproxy');
        $this->load->database();

        $this->table = 'appa_user';
	}
    

	/**
	 * Get users
	 *
	 * @return	object
	 */
	function enumerate($offset,$rows,$sort,$dir,$filters,$search)
	{

		$this->_build_enumerate($offset,$rows,$sort,$dir,$filters,$search);
		$this->db->from($this->table. ' user');
        $total = $this->db->count_all_results();
		$this->db->flush_cache();
		

		$this->_build_enumerate($offset,$rows,$sort,$dir,$filters,$search);
        $this->db->limit($rows,$offset);
		$query = $this->db->get($this->table. ' user');
		$this->db->flush_cache();

        return $this->senchaproxy->formatQueryResult($query,$total);
	}

	function _build_enumerate($offset,$rows,$sort,$dir,$filters,$search)
	{
		$this->db->start_cache();

        $this->db->select('user.id, user.username, user.email, user.active');
        $this->db->select('user.name, user.surname');

		if (!empty($search))
		{
			$this->db->like('UPPER(user.username)', strtoupper($search));
			$this->db->or_like('UPPER(user.name)', strtoupper($search)); 
			$this->db->or_like('UPPER(user.surname)', strtoupper($search)); 
			$this->db->or_like('UPPER(user.email)', strtoupper($search)); 
		}

        if (!empty($sort) && !empty($dir)) 
        {
            $this->db->order_by('UPPER('.$sort.')',$dir);
		}
		else
		{
        	$this->db->order_by('username','ASC');
        }

		$this->db->stop_cache();

	}

	/**
	 * Get user
	 *
	 * @return user
	 */
	function get($id)
	{
		// define query
        $this->db->select('user.id, user.username, user.email, user.active');
        $this->db->select('user.name, user.surname');

		$this->db->where('user.id',$id);

        // execute query
		$query = $this->db->get($this->table.' user');

		// format and return result to controller
        return $query->result();

	}

	/**
	 * Create record
	 *
	 * @param	array
	 * @return	object
	 */
	function create_record($data) 
	{
		$this->db->set('username',$data['username']);
		$this->db->set('email',$data['email']);
		$this->db->set('active',$data['active']);

		// optional fields
		if (isset($data['name'])) $this->db->set('name',$data['name']);
		if (isset($data['surname']))$this->db->set('surname',$data['surname']);

        // execute query
		$query = $this->db->insert($this->table);

		// get newly created record
		$record = $this->get($this->db->insert_id());

        // return formatted result
        return $this->senchaproxy->formatOperationResult($query,array($record[0]));
	}

	/**
	 * Update record
	 *
	 * @param	array
	 * @return	object
	 */
	function update_record($data) 
	{
        // get/set the id and remove it from the data array
		$id = $data['id'];
        $this->db->where('id', $id);
        unset($data['id']);

		// remove password confirmation field
		if (isset($data['password2'])) unset($data['password2']);

        // execute query
		$query = $this->db->update($this->table, $data);

        // return formatted result
        return $this->senchaproxy->formatOperationResult($query,$this->get($id));
	}

	/**
	 * Delete record
	 *
	 * @param	array
	 * @return	object
	 */
	function delete_record($data) 
	{
        // get/set the id 
        $this->db->where('id', $data['id']);

        // execute query
		$query = $this->db->delete($this->table);

        // return formatted result
        return $this->senchaproxy->formatOperationResult($query);
	}

};
