$.ajaxSetup({ cache: false });

var noter = window.noter || {};
noter.app = noter.app || {};

noter.app.initialize = function(){
	$(function() {
		init();
		
		function init(){
		    initBindings();
            initData();
	    }
	    
	    function getPageSelectors(){
	        return {
	            saveNoteBtn: $(".app .btn-save-note"),
	            editNoteBtn: $(".btn-edit-note"),
	            deleteNoteBtn: $(".btn-delete-note"),
	            logoutBtn: $(".btn-logout"),
	            titleField: $(".app .title-field"),
	            noteField: $(".app .note-field"),
	            notesContainer: $(".app .notes"),
	            editNoteModal: $(".edit-note-modal"),
	            editNoteModalTitleField: $(".edit-note-modal .edited-title-field"),
	            editNoteModalNoteField: $(".edit-note-modal .edited-note-field"),
	            editNoteModalSaveBtn: $(".edit-note-modal .btn-save-edited-note"),
	            viewNoteModal: $(".view-note-modal"),
	            viewNoteModalTitleField: $(".view-note-modal .title"),
	            viewNoteModalNoteField: $(".view-note-modal .note")
	        }
	    }
	    
	    function initBindings(){
	        var selectors = getPageSelectors();
	        selectors.saveNoteBtn.on("click", saveNoteCallback);
	        selectors.logoutBtn.on("click", logout);
	        selectors.notesContainer.on("click", ".btn-view-note", viewNoteCallback);
	        selectors.notesContainer.on("click", ".btn-edit-note", editNoteCallback);
	        selectors.notesContainer.on("click", ".btn-delete-note", deleteNoteCallback);
	        selectors.editNoteModalSaveBtn.on("click", saveEditedNoteCallback);
	        
	        selectors.editNoteModal.on("show.bs.modal", clearEditModalFields);
	        selectors.viewNoteModal.on("show.bs.modal", clearViewModalFields);
	    }
	    
	    function saveNoteCallback(){
	        var selectors = getPageSelectors();
	        var headers = {};
	        headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	        var data = {
	            title: selectors.titleField.val(),
	            note: selectors.noteField.val()
	        };
	        
	        $.ajax({
		    	type: config.api.endpoints.saveNote.method,
                url: config.api.endpoints.saveNote.url,
                headers: headers,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    selectors.saveNoteBtn.attr("disabled", true);
                },
                success: function(resp){
                	if(resp.status == true){
                		appendNote(resp.note);
                		clearNewNoteFields();
                		toastr.success(config.messages.noteSaveSuccess);
                	}
                	else if(resp.status == false){
                		toastr.error(resp.msg)
                	}
                },
                error: function(){
                    
		    	},
		    	complete: function(){
                    selectors.saveNoteBtn.attr("disabled", false);
		    	}
            });
	    }
	    
	    function appendNote(note){
	    	var selectors = getPageSelectors();
	    	var markup = "";
	    	markup  = getSingleNoteTemplate(note);
	    	selectors.notesContainer.append(markup);
	    }
	    
	    function clearNewNoteFields(){
	    	var selectors = getPageSelectors();
			selectors.titleField.val("");
			selectors.noteField.val("");
	    }
	    
	    function logout(){
	    	var selectors = getPageSelectors();
	        var headers = {};
	        headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	        var data = {};
	        
	        $.ajax({
		    	type: config.api.endpoints.logout.method,
                url: config.api.endpoints.logout.url,
                headers: headers,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    
                },
                success: function(resp){
                	if(resp.status == true){
                		toastr.success(config.messages.logoutSuccess);
                		window.location.href = '/';
                	}
                	else if(resp.status == false){
                		toastr.error(resp.msg)
                	}
                },
                error: function(){
                    
		    	},
		    	complete: function(){
                    
		    	}
            });
	    }
	    
	    function viewNoteCallback(){
	    	var selectors = getPageSelectors();
	    	selectors.viewNoteModal.modal("show");
	    	
	    	var noteElem = $(this);
	    	var noteId = noteElem.parents(".note").data("note-id");
	    	
	    	var headers = {};
	        headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	        var data = {
	        	noteId: noteId
	        };
	        
	        $.ajax({
		    	type: config.api.endpoints.getNote.method,
                url: config.api.endpoints.getNote.url,
                headers: headers,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    
                },
                success: function(resp){
                	if(resp.status == true){
                		selectors.viewNoteModalTitleField.html(resp.data.note.html_safe_title);
                		selectors.viewNoteModalNoteField.html(resp.data.note.html_safe_note);
                	}
                	else if(resp.status == false){
                		selectors.viewNoteModal.modal("hide");
                		toastr.error(resp.msg)
                	}
                },
                error: function(){
                    
		    	},
		    	complete: function(){
                    
		    	}
            });
	    }
	    
	    function editNoteCallback(){
	    	var selectors = getPageSelectors();
	    	selectors.editNoteModal.modal("show");
	    	
	    	var noteElem = $(this);
	    	var noteId = noteElem.parents(".note").data("note-id");
	    	
	    	selectors.editNoteModal.data("note-id", noteId);
	    	
	    	var headers = {};
	        headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	        var data = {
	        	noteId: noteId
	        };
	        
	    	$.ajax({
		    	type: config.api.endpoints.getNote.method,
                url: config.api.endpoints.getNote.url,
                headers: headers,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    
                },
                success: function(resp){
                	if(resp.status == true){
                		selectors.editNoteModalTitleField.val(resp.data.note.title);
                		selectors.editNoteModalNoteField.val(resp.data.note.note);
                	}
                	else if(resp.status == false){
                		selectors.editNoteModal.modal("hide");
                		toastr.error(resp.msg)
                	}
                },
                error: function(){
                    
		    	},
		    	complete: function(){
                    
		    	}
            });
	    }
	    
	    function deleteNoteCallback(){
	    	var noteElem = $(this);
	    	var noteId = noteElem.parents(".note").data("note-id");
	    	
	    	var deleteConfirm = confirm("Are you sure you want to delete this note?");
	    	if(deleteConfirm == true){
	    		deleteNote(noteId);
	    	}
	    }
	    
	    function deleteNote(noteId){
	    	var headers = {};
	        headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	        var data = {
	        	noteId: noteId
	        };
	        
	    	$.ajax({
		    	type: config.api.endpoints.deleteNote.method,
                url: config.api.endpoints.deleteNote.url,
                headers: headers,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    
                },
                success: function(resp){
                	if(resp.status == true){
                		removeNote(noteId);
                		toastr.success(config.messages.noteDeleteSuccess);
                	}
                	else if(resp.status == false){
                		
                	}
                },
                error: function(){
                    
		    	},
		    	complete: function(){
                    
		    	}
            });
	    }
	    
	    function removeNote(noteId){
	    	var selectors = getPageSelectors();
	    	selectors.notesContainer.find(".note[data-note-id='"+noteId+"']").remove();
	    }
	    
	    function saveEditedNoteCallback(){
	    	var selectors = getPageSelectors();
	        var headers = {};
	        headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	        var noteId = $(this).parents(".modal").data("note-id");
	        var data = {
	        	noteId: noteId,
	            title: selectors.editNoteModalTitleField.val(),
	            note: selectors.editNoteModalNoteField.val()
	        };
	        
	        $.ajax({
		    	type: config.api.endpoints.updateNote.method,
                url: config.api.endpoints.updateNote.url,
                headers: headers,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    selectors.editNoteModalSaveBtn.attr("disabled", true);
                },
                success: function(resp){
                	if(resp.status == true){
                		selectors.notesContainer.find(".note[data-note-id='"+noteId+"'] .title").html(resp.note.html_safe_title);
                		toastr.success(config.messages.noteSaveSuccess);
                		selectors.editNoteModal.modal("hide");
                	}
                	else if(resp.status == false){
                		toastr.error(resp.msg)
                	}
                },
                error: function(){
                    
		    	},
		    	complete: function(){
                    selectors.editNoteModalSaveBtn.attr("disabled", false);
		    	}
            });
	    }
	    
	    function clearEditModalFields(){
			var selectors = getPageSelectors();
			selectors.editNoteModalTitleField.val("");
			selectors.editNoteModalNoteField.val("");
	    }
	    
	    function clearViewModalFields(){
	    	var selectors = getPageSelectors();
			selectors.viewNoteModalTitleField.html("Loading...");
			selectors.viewNoteModalNoteField.html("");
	    }
	    
	    function initData(){
	    	initNotesData();
	    }
	    
	    function initNotesData(){
	    	var selectors = getPageSelectors();
	        var headers = {};
	        headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	        var data = {};
	        
	        $.ajax({
		    	type: config.api.endpoints.allNotes.method,
                url: config.api.endpoints.allNotes.url,
                headers: headers,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    
                },
                success: function(resp){
                	if(resp.status == true){
                		populateNotes(resp.data.notes)
                	}
                	else if(resp.status == false){
                		
                	}
                },
                error: function(){
                    
		    	},
		    	complete: function(){
                    
		    	}
            });
	    }
	    
	    function populateNotes(notes){
	    	var selectors = getPageSelectors();
	    	var markup = "";
	    	
	    	$.each(notes, function(index, note){
	    		markup += getSingleNoteTemplate(note);
	    	});
	    	
	    	selectors.notesContainer.html(markup);
	    }
	    
	    function getSingleNoteTemplate(note){
	    	var markup = "";
	    	
	    	markup += "<div class='note row' data-note-id='" + note.id + "'>";
            markup += "<div class='title col-md-9'>";
            markup += note.html_safe_title;
            markup += "</div>";
            markup += "<div class='btns col-md-3'>";
            markup += "<div class='row'>";
            markup += "<div class='col-md-4'>";
            markup += "<button class='btn btn-primary btn-view-note' type='button'>View</button>";
            markup += "</div>";
            markup += "<div class='col-md-4'>";
            markup += "<button class='btn btn-primary btn-edit-note' type='button'>Edit</button>";
            markup += "</div>";
            markup += "<div class='col-md-4'>";
            markup += "<button class='btn btn-danger btn-delete-note' type='button'>Delete</button>";
            markup += "</div>";
            markup += "</div>";
            markup += "</div>";
        	markup += "</div>";
        	
        	return markup;
	    }
	    
	});
}
