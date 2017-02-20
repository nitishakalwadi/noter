<?php  if(!defined('BASEPATH')) exit('No direct script access allowed');

class Notes_model extends MY_Model
{
	public function __construct()
	{
        $this->table = 'notes';
        $this->primary_key = 'id';
        
        //enable soft delete
        $this->soft_deletes = TRUE;
        
        //relationships
        $this->has_one['user'] = array('foreign_model'=>'User_model','foreign_table'=>'users','foreign_key'=>'id','local_key'=>'user_id');
        
        //observers
        $this->after_get[] = 'convert_htmlspecialchars';
        
        parent::__construct();
	}
	
	protected function convert_htmlspecialchars($data){
		// if(is_array($data) && $this->db->affected_rows() > 1){
		if(key($data) === 0){
	        $arr_len = count($data);
	        for($i=0; $i<$arr_len; $i++){
	            $data[$i]['html_safe_title'] = nl2br(htmlspecialchars( $data[$i]['title'] ));
	            $data[$i]['html_safe_note'] = nl2br(htmlspecialchars( $data[$i]['note'] ));
	        }
	    }
	    else{
	        $data['html_safe_title'] = nl2br(htmlspecialchars( $data['title'] ));
	        $data['html_safe_note'] = nl2br(htmlspecialchars( $data['note'] ));
	    }
	    return $data;
	}
}