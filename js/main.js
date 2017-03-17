//STANDARD GLOBAL VARIABLES
var role  = getCookie("role");
var email = getCookie("email")
var fullname = getCookie("fullname");

//CUSTOM GLOBAL VARIABLES


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
    "esri/config", "esri/urlUtils"
], function(
    esriConfig, urlUtils
) {
//    esri.config.defaults.io.corsEnabledServers.push("https://dev.dnr.state.mn.us/mndnr/rest/services");
    esriConfig.defaults.io.proxyUrl = "/proxy/";
    
    //2K12CARRRION
    urlUtils.addProxyRule({ 
        urlPrefix: "https://dev.dnr.state.mn.us/mndnr/rest/services/",
        proxyUrl: "proxy.ashx"
    });

    urlUtils.addProxyRule({ 
        urlPrefix: "https://dev.dnr.state.mn.us/mndnr/rest/services/for/pfmwm_woodlandmgmtplanning/FeatureServer/1",
        proxyUrl: "proxy.ashx"
    });

//    //2K12CARCASSTEST;
//    esri.addProxyRule({
//        urlPrefix: "https://dev.dnr.state.mn.us/arcgis/rest/services/",
//        proxyUrl: "proxy.ashx"
//    });
    
//    //2K12VOLE
//    esri.addProxyRule({
//        urlPrefix: "https://arcgis.dnr.state.mn.us/arcgis/rest/services/",
//        proxyUrl: "proxy.ashx"
//    });
});