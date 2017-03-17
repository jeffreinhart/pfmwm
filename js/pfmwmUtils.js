//var role = checkLoginGetRole();
var fullPageZoom = [[-94, 46.300],6]

function checkLoginGetRole() {
    var role = getCookie("role");
    if(role == '') {
        alert('You are not logged in. Returning to login page.');
        window.location = 'index.html';
    } else {
        console.log(role);
        return role;
    }
} // end checkLoginGetRole

function loadScript(url, callback, obj)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    // Once the script has been loaded the callback function (loadTool) is fired
    //   to insert HTML code into the app and set up listeners
    script.onreadystatechange = function() {callback(obj); }
    script.onload = function() {callback(obj);}

    // Fire the loading
    head.appendChild(script);
}

var loadTool = function(value) {
    //CREATE NEW INSTANCE OF OBJECT
    switch(value.name) {
        case "about":
            pT = new About();
            break;
        case "legend":
            pT = new CustomLegend();
            break;
        case "search":
            pT = new Search();
            break;
        case "splashscreen":
            pT = new SplashScreen();
            break;
        default:

    }
    switch (value.type) {
        case "button":
            //GET PANEL HTML AND ADD IT TO PANELS
            panelHTML = pT.get_Panel();
            $('#main-nav').append(panelHTML);
            break;
        case "splashscreen":
            dialogHTML = pT.get_Dialog();
            $('#map-root').append(dialogHTML);
            setCustomEventListeners();
            $('#Dialog').modal('show');
            return;
            break;
        default:
    }

    setCustomEventListeners();
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookies() {
    document.cookie = "email" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "role" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "fullname" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    email = "";
    role = "";
    fullname = "";
    console.log('asd email=' + email + '  role=' + role);
    window.location.replace("index.html");
}

function jsonToForm(jsonIn, divId){
    $(function() {
        // Generate a form
        $("#"+divId).dform(jsonIn);
    });
} // end jsonToForm

function disableForm(formID){
    $('#'+formID).children(':input').attr('disabled', 'disabled');
}