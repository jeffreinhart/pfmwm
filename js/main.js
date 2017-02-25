//STANDARD GLOBAL VARIABLES
var role  = getCookie("role");
var email = getCookie("email")
var fullname = getCookie("fullname");

//CUSTOM GLOBAL VARIABLES
var fullPageZoom = [[-94, 46.300],6]

//BROWSER CHECK >>>>>>
$().toastmessage({
    sticky   : true,
    position : 'middle-center',
    type     : 'success'

});

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
//BROWSER CHECK <<<<<<

require([
    "esri/tasks/GeometryService",
    "dojo/parser", "dojo/json", "dojo/dom",
], function(
    GeometryService,
    parser, json, dom
) {

    esriConfig.defaults.io.proxyUrl = "/proxy/";

    //2K12CARCASSTEST
    esri.addProxyRule({
        urlPrefix: "https://dev.dnr.state.mn.us/arcgis/rest/services/",
        proxyUrl: "proxy.ashx"
    });
    //2K12VOLE
    esri.addProxyRule({
        urlPrefix: "https://arcgis.dnr.state.mn.us/arcgis/rest/services/",
        proxyUrl: "proxy.ashx"
    });
    //2K12SALMON
    esri.addProxyRule({
        urlPrefix: "https://arcgis.dnr.state.mn.us/mndnr/rest/services/",
        proxyUrl: "proxy.ashx"
    });
    //2K12SKINK
    esri.addProxyRule({
        urlPrefix: "https://arcgis.dnr.state.mn.us/public/rest/services/",
        proxyUrl: "proxy.ashx"
    });

});

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