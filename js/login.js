$(document).ready(function() {

$.support.cors = true; 

function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
        $().toastmessage('showWarningToast', "This application is only supported in modern browsers. Please switch to Firefox or Chrome.");
    else                 // If another browser, return 0
        return;  
}

//Check to make sure user is using a proper browser
msieversion();

document.getElementById("user")
  .addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
      $('#submit-login').click();
  }
});

document.getElementById("password")
  .addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
      $('#submit-login').click();
  }
}); 

$('#submit-login').click(function() {
    var userTxt = $('#user').val();
    var passwordTxt = $('#password').val();
 
    if(userTxt == "") {alert('Enter a Valid UserName...'); return;}
    if(passwordTxt == "") {alert('Enter a Valid Password...');  return;}
 
    $.ajax({
        url: "https://arcgis.dnr.state.mn.us/extranet/all_auth/login.py",
        type: "POST",
        data: {
            "username": $('#user').val(),
            "password": $('#password').val(),
            "type": 'signin',
            "appid": '85',  //GLOBAL VARIABLE  -- EXTRANETID
            "prod": 'false'  //GLOBAL VARIABLE  -- PRODUCTION
        },
        dataType: 'json',
        error: function(err) {
            $().toastmessage('showSuccessToast', "Authentication service failed. Please try again later");
        },
        success: function(resp) {
            var response = (typeof resp === "String" ? $.parseJSON(resp) : resp);
            if(response == null){
                $().toastmessage('showWarningToast', "Username or password not valid");
            }
            else if(response.status[0] == 'ERROR'){
                var str = response.result[0];
                $().toastmessage('showWarningToast', str );
            }
            else if(response == 'ERROR'){
                var str = response['message'];
                $().toastmessage('showWarningToast', str );
            }
            else if(response.status[0] == 'SUCCESS'){
                if(response.result[1] === 'Signup'){
                    $().toastmessage('showWarningToast', "This account has not yet been authorzied for access to the application.");
                    return;
                }
                else setCookie(response.result[0],response.result[1],response.result[2],response.result[3]);
            }
        },
        timeout: 5000 // sets timeout to 5 seconds  
    });
});
 
///set cookie to access token, email and county from next view
function setCookie(fname,lname,mail,role) {
    console.log('role=' + role);
    if (role.toLowerCase() == 'admin') role = 'Administrator';

    document.cookie = "fullname="+fname+" "+lname;
    document.cookie = "email="+mail;
    document.cookie = "role="+role;

    //redirect to next view
    window.location.replace("main.html");  
}


function create_user() {
    var a = $("#signupform");
    if (a.validate(),
    a.valid() !== !1) {
        $.support.cors = !0;
        var b = {
            name: $("#signup_first_name").val(),
            lastname: $("#lastname").val(),
            address: $("#address").val(),
            address: $("#address").val(),
            city: $("#city").val(),
            zip: $("#zip").val(),
            phone_number: $("#phone_number").val(),
            email: $("#firstemail").val(),
            username: $("#firstemail").val(),
            password: $("#password1").val(),
            type: "signup",
            appid: '85',  //GLOBAL VARIABLE  -- EXTRANETID
            prod: 'false',  //GLOBAL VARIABLE  -- PRODUCTION
            from_email: 'christopher.pouliot@state.mn.us',  //GLOBAL VARIABLE  -- FROM CONFIG
            to_email: 'christopher.pouliot@state.mn.us'  //GLOBAL VARIABLE  -- FROM CONFIG
        };
        $.ajax({
            url: "https://arcgis.dnr.state.mn.us/extranet/all_auth/login.py",
            type: "POST",
            data: b,
            dataType: "json",
            error: function() {
                alert("Authentication has failed...")
            },
            success: function(a) {
                var b = "String" == typeof a ? $.parseJSON(a) : a;
                if ("SUCCESS" == b.status && $().toastmessage("showSuccessToast", "Your credentials have been submitted for approval.  You will receive an email requiring you to verify your email address. Once verified you will have to wait for a confirmation email from DNR staff stating you are now an active user in the system before logging in."),
                "active" == b.status && $().toastmessage("showSuccessToast", "Your credentials have been submitted for approval.  Once verified you will have to wait for a confirmation email from DNR staff stating you are now an active user in the system before logging in."),
                "ERROR" == b.status) {
                    var c = b.message;
                    $().toastmessage("showWarningToast", c)
                }
            },
            timeout: 5e3
        })
    }
}
function isNumberKey(a) {
    var b = a.which ? a.which : event.keyCode;
    return b > 31 && (48 > b || b > 57) ? !1 : !0
}

});