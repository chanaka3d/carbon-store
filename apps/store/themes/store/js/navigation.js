$(function() {

    var showError = function (message) {
        var msg = message.replace(/[0-9a-z.+]+:\s/i, '');
        $('#register-alert').html(msg).fadeIn('fast');
        $('#btn-signin').text('Sign in').removeClass('disabled');
    };

	/*var login = function() {
		if (!$("#form-login").valid())
			return;
		$('#btn-signin').addClass('disabled').text('Signing in');

		var username = $('#inp-username').val();
		var password = $('#inp-password').val();

        caramel.ajax({
            type: 'POST',
            url: '/apis/user/login',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function (data) {
                if (!data.error) {
                    location.reload();
                } else {
                    showError(data.message);
                }
            },
            contentType: 'application/json',
            dataType: 'json'
        });
	};*/

	var register = function() {
		if (!$("#form-register").valid())
			return;
		caramel.post('/apis/user/register', JSON.stringify({
			username : $('#inp-username-register').val(),
			password : $('#inp-password-register').val()
		}), function(data) {
			if (!data.error) {
				location.reload();
			} else {
				showError(data.message);
			}
		}, "json");
	};

	$('#btn-signout').on('click', function() {
		caramel.post("/apis/user/logout", function(data) {
			location.reload();
		}, "json");
	});

	//$('#btn-signin').bind('click', login);

	/*$('#modal-login input').bind('keypress', function(e) {
		if (e.keyCode === 13) {
			login();
		}
	});*/

	$('#inp-username-register').change(function() {
		var username = $(this).val();
		caramel.post('/apis/user/exists', JSON.stringify({
			username : $('#inp-username-register').val()
		}), function(data) {
			if (data.error || data.exists) {
				$('#register-alert').html(data.message).fadeIn('fast');
			} else {
				$('#register-alert').fadeOut('slow');
			}
		}, "json");
	});

	$('#btn-register-submit').click(register);

	$('#modal-register input').keypress(function(e) {
		if (e.keyCode === 13) {
			register();
		}
	});


	$('#sso-login').click(function() {
		$('#sso-login-form').submit();
	});

	$('.store-menu > li > a').click(function(){
		var url = $(this).attr('href');
		window.location = url;
	});

    $('.store-menu > li > ul > li > a').click(function(){
        var url = $(this).attr('href');
        window.location = url;
    });


	$('.dropdown-toggle').click(function(){
		window.location = $(this).attr('href');
	});

    $("[data-toggle=popover]").popover();

    var addLeftPanel = function(){
        $('#left-sidebar').hide();
        $('#assets-container').css('margin-left','0px');
        $('.search-wrapper').css('margin-left','0px');
        $('.toggle-menu-left-wrapper').css('display','table-cell');
    };
    var removeLeftPanel = function(){
        $('#left-sidebar').show();
        $('#assets-container').css('margin-left','250px');
        $('.search-wrapper').css('margin-left','250px');
        $('.toggle-menu-left-wrapper').css('display','none');
    };
    var makeLeftMenuAndButtons = function(){
        var windowSize = $(window).width();
        if(windowSize > 768 ){
            removeLeftPanel();
        } else{
            addLeftPanel();
        }
    };
    $(window).resize(makeLeftMenuAndButtons);
    $(document).ready(makeLeftMenuAndButtons);
    var hideLeftPanel = function(){
        $('#left-sidebar').hide();
        $('.search-wrapper').css('margin-left','0px');
    };
    var showLeftPanel = function(){
        $('#left-sidebar').show();
        $('.search-wrapper').css('margin-left','250px');
    };
    $('.toggle-menu-left').click(function(){
        if($('#left-sidebar').is(":visible")){
            hideLeftPanel();
        } else {
            showLeftPanel();
        }
    });
});
