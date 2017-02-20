$.ajaxSetup({ cache: false });

var noter = window.noter || {};
noter.home = noter.home || {};

noter.home.initialize = function(){
	$(function() {
		init();
		
		function init(){
	        initBindings();
	    }
	    
	    function getPageSelectors(){
	        return {
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
	});
}
