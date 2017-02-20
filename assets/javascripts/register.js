$.ajaxSetup({ cache: false });

var noter = window.noter || {};
noter.register = noter.register || {};

noter.register.initialize = function(){
	$(function() {
		init();
		
		function init(){
	        initBindings();
	    }
	    
	    function getPageSelectors(){
	        return {
	            registerBtn: $(".register .btn-register"),
	            emailField: $(".register .email-field"),
	            passwordField: $(".register .password-field"),
	            confirmPasswordField: $(".register .confirm-password-field")
	        }
	    }
	    
	    function initBindings(){
	        var selectors = getPageSelectors();
	        selectors.registerBtn.on("click", register);
	    }
	    
	    function register(){
	        var selectors = getPageSelectors();
	        var data = {
	            email: selectors.emailField.val(),
	            password: selectors.passwordField.val(),
	            confirmPassword: selectors.confirmPasswordField.val()
	        };
	    
	        $.ajax({
		    	type: config.api.endpoints.register.method,
                url: config.api.endpoints.register.url,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    selectors.registerBtn.attr("disabled", true);
                },
                success: function(resp){
                	if(resp.status == true){
                		toastr.success(config.messages.registerSuccess);
            		    window.location.href = '/';
                	}
                	else if(resp.status == false){
                		toastr.error(resp.msg)
                	}
                },
                error: function(){
                    
		    	},
		    	complete: function(){
                    selectors.registerBtn.attr("disabled", false);
		    	}
            });
	    }
	});
}
