$.ajaxSetup({ cache: false });

var noter = window.noter || {};
noter.home = noter.home || {};

noter.home.initialize = function(){
	$(function() {
		init();
		
		function init(){
	        initBindings();
	        initValidation();
	    }
	    
	    function getPageSelectors(){
	        return {
	        	loginForm: $(".home #loginForm"),
	            loginBtn: $(".home .btn-login"),
	            emailField: $(".home .email-field"),
	            passwordField: $(".home .password-field")
	        }
	    }
	    
	    function initBindings(){
	        var selectors = getPageSelectors();
	        selectors.loginBtn.on("click", login);
	    }
	    
	    function login(){
	        var selectors = getPageSelectors();
	        
	        if( ! selectors.loginForm.valid() ){
				return;
			}
	        
	        var data = {
	            email: selectors.emailField.val(),
	            password: selectors.passwordField.val()
	        };
	    
	        $.ajax({
		    	type: config.api.endpoints.login.method,
                url: config.api.endpoints.login.url,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    selectors.loginBtn.attr("disabled", true);
                },
                success: function(resp){
                	if(resp.status == true){
                		Cookies.set(config.api.apiKey.name, resp[config.api.apiKey.name], { expires: new Date( resp.valid_till * 1000 ) });
            		    toastr.success(config.messages.loginSuccess);
            		    window.location.href = '/app';
                	}
                	else if(resp.status == false){
                		toastr.error(resp.msg)
                	}
                },
                error: function(){
                    
		    	},
		    	complete: function(){
                    selectors.loginBtn.attr("disabled", false);
		    	}
            });
	    }
	    
	    function initValidation(){
	    	var selectors = getPageSelectors();
	        
	    	var validationRules = {
				'email': {
					required: true,
					email: true
				},
				'password': {
					required: true
				}
			};
	
			var formValidator = selectors.loginForm.validate({
				rules: validationRules,
				ignore: [], //allow hidden fields to be validated
				onsubmit: false,
				errorPlacement: function(error, element){
					error.insertAfter(element);
				},
				errorElement: "div",
				errorClass: "aler alert-danger",
				validClass: "alert alert-success",
				highlight: "",
				unhighlight: ""
			});
	    }
	});
}
