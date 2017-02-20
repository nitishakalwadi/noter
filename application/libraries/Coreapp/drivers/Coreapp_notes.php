<?php

class Coreapp_notes extends CI_Driver {

    function __construct() {
	    
	}
	
	public function get_all_notes(){
	    $this->CI->load->model("notes_model");
	    
	    $notes = $this->CI->notes_model
					->where("user_id", $this->user->id)
					->with_user("fields:email")
					->get_all();
		
		if($notes){
			$return['status'] = TRUE;
			$return['data']['notes'] = $notes;
		}
		else{
			$return['status'] = FALSE;
			$return['msg'] = $this->messages['generic_error'];
		}
		
		return $return;
	}
	
	public function save_note(){
		//check validation
		$this->CI->form_validation->set_rules('title' , 'title' , 'required|max_length[255]'); 
		$this->CI->form_validation->set_rules('note' , 'note' , 'required|max_length[65535]'); 
        if ($this->CI->form_validation->run() == FALSE) { 
            $return['status'] = FALSE;
            $return['msg'] = $this->messages['generic_error'];
            return $return;
        }
        
        $title	    = $this->CI->input->post("title");
        $note	    = $this->CI->input->post("note");
        
        //load model
        $this->CI->load->model("notes_model");
        
        $note = array(
            "title" => $title,
            "note" => $note,
            "user_id" => $this->user->id
        );
        
        $note_id = $this->CI->notes_model->insert($note);
            
        $note = $this->CI->notes_model
				->where("id", $note_id)
				->with_user("fields:email")
				->get();
        
        if($note_id){
            $return["status"] = TRUE;
            $return["note"] = $note;
        }
        else{
        	$return["status"] = FALSE;
            $return["msg"] = $this->messages["note_save_failure"];
        }
        
        return $return;
	}
	
	public function update_note(){
	    //check validation
	    $this->CI->form_validation->set_rules('noteId'  , 'note id' , 'required|numeric'); 
		$this->CI->form_validation->set_rules('title'   , 'title'   , 'required|max_length[255]'); 
		$this->CI->form_validation->set_rules('note'    , 'note'    , 'required|max_length[65535]'); 
        if ($this->CI->form_validation->run() == FALSE) { 
            $return['status'] = FALSE;
            $return['msg'] = $this->messages['generic_error'];
            return $return;
        }
        
        $note_id    = $this->CI->input->post("noteId");
        $title	    = $this->CI->input->post("title");
        $note	    = $this->CI->input->post("note");
        
        //load model
        $this->CI->load->model("notes_model");
        
        $note = array(
            "title" => $title,
            "note" => $note,
        );
            
        $status = $this->CI->notes_model->update($note, $note_id);
            
        $note = $this->CI->notes_model
				->where("id", $note_id)
				->with_user("fields:email")
				->get();
        
        if($status === FALSE){
        	$return["status"] = FALSE;
            $return["msg"] = $this->messages["note_save_failure"];
        }
        else{
        	$return["status"] = TRUE;
            $return["note"] = $note;
        }
        
        return $return;
	}
	
	public function delete_note(){
		//check validation
		$this->CI->form_validation->set_rules('noteId' , 'note id' , 'required|numeric'); 
		if ($this->CI->form_validation->run() == FALSE) { 
            $return['status'] = FALSE;
            $return['msg'] = $this->messages['invalid_note_id'];
            return $return;
        }
        
        $this->CI->load->model("notes_model");
        
        $note_id	= $this->CI->input->post("noteId");
        
        $status = $this->CI->notes_model->delete($note_id);
        
        if($status === FALSE){
        	$return['status'] = FALSE;
			$return['msg'] = $this->messages['generic_error'];
        }
        else{
        	$return['status'] = TRUE;
        }
        
        return $return;
	}
	
	public function get_note(){
	    //check validation
		$this->CI->form_validation->set_rules('noteId' , 'note id' , 'required|numeric'); 
		if ($this->CI->form_validation->run() == FALSE) {
            $return['status'] = FALSE;
            $return['msg'] = $this->messages['invalid_note_id'];
            return $return;
        }
        
        $this->CI->load->model("notes_model");
        
        $note_id	= $this->CI->input->post("noteId");
        
        $note = $this->CI->notes_model
				->where("id", $note_id)
				->where("user_id", $this->user->id)
				->with_user("fields:email")
				->get();
				
		if($note){
			$return['status'] = TRUE;
			$return['data']['note'] = $note;
		}
		else{
			$return['status'] = FALSE;
			$return['msg'] = $this->messages['generic_error'];
		}
		
		return $return;
	}
}