//STANDARD GLOBAL VARIABLES
var map;

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


$(document).ready(function() {
//     $('#Dialog').modal('show');
});

require([
    "esri/map","esri/layers/FeatureLayer",
    "esri/tasks/GeometryService",
    "esri/graphic", "esri/symbols/SimpleFillSymbol",
    "dojo/parser", "dojo/json", "dojo/dom",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
    "dojo/domReady!","esri/virtualearth/VEGeocoder"
], function(
    Map, FeatureLayer, GeometryService,
    Graphic, SimpleFillSymbol, parser, json, dom
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

    map = new Map("map", {
        basemap: "streets",
        center: [-95.249, 46.300],
        zoom: 7,
        slider: true,
        logo: false
    });


    /* BASEMAP SWITCHER BUTTONS */
    //If a user selects the active basemap, do nothing
    //Else load the selected basemap
    $("#map-switcher a").click(function(){
      $("#map-switcher a").removeClass('active'); //Remove the previously selected basemap's active class
      $(this).addClass('active'); //Set the active class to the newly clicked basemap
      var basemapName = $(this).attr('id')
      if (basemapName == map._basemap) {
        //do nothing
      } else {
        map.setBasemap(basemapName);
      }
    });

    map.on("load", function(evt) {
        //LOAD CUSTOM STUFF FROM CONFIG.JS
        Config_Load();

        //Add 'Home' button to zoom in/out buttons
        addHomeSlider();

        //Set listeners for Standard Div Events -- located in divEvents.js
        setEventListeners();

        //Finished Loading so hide the spinny dealie
        esri.hide(dojo.byId("loading"));
    });
});

//ADD HOME BUTTON (ZOOM TO STATE)
function addHomeSlider() {
    //let's add the home button slider as a created class, requrires dom-Attr
    dojo.create("div", {
        className: "esriSimpleSliderHomeButton",
        title: 'Zoom to Full Extent',
        onclick: function() {
            map.centerAndZoom([-95.249, 46.300],7);
        }
    }, dojo.query(".esriSimpleSliderIncrementButton")[0], "after");
}

function Config_Load() {
    //SET TITLE OF PAGE IN TAB AND IN BANNER
    document.title = CONFIG.title;
    $("#appTitle").text(CONFIG.title);

    //ITERATE THROUGH LAYERS AND LOAD THOSE THAT APPLY
    $.each(CONFIG.layers, function(index, value) {
        try {
            //GET PROPER URL
            var aURL = value.devUrl;
            if (CONFIG.production == "true") { aURL = value.prodUrl; }

            switch(value.type) {
                case "FeatureLayer":
                    //CREATE FEATURE LAYER AND ADD IT TO THE MAP
                    var fl = new esri.layers.FeatureLayer(aURL, {
                        mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
                        outFields : value.outFields,
                        id: value.name
                    });
                    map.addLayer(fl);
                    break;
                case "ArcGISTiledMapServiceLayer":
                    var fl = new esri.layers.ArcGISTiledMapServiceLayer(aURL);
                    //"http://arcgis.dnr.state.mn.us/arcgis/rest/services/mndnr_2010_fsa_photos/MapServer"
                    //{id: "aerial"});
                    map.addLayer(fl);
                    break;
                case "ArcGISDynamicMapServiceLayer":
                    var fl = new esri.layers.ArcGISDynamicMapServiceLayer(aURL, {
                        id: value.name,
                        outFields: value.outFields
                    });
                    //"http://arcgis.dev.dnr.state.mn.us/arcgis/rest/services/wld/AnimalDamage_Dyn_Service/MapServer",
                    map.addLayer(fl);
                    break;

                default:
            }
        }
        catch(err) {
            console.log(err.message);
        }
    });


    //ITERATE THROUGH TOOLS AND LOAD THOSE THAT APPLY
    $.each(CONFIG.projectTools, function(index, value) {
        try {
            //DON'T LOAD TOOLS THAT HAVE LOAD=FALSE
            if (value.load == "false") { return; }
            loadScript(value.file, loadTool, value);
        }
        catch(err) {
            console.log(err.message);
        }
    });

    //ITERATE THROUGH WORKING LAYERS AND LOAD THOSE THAT APPLY

    //ITERATE THROUGH BASEMAP LAYERS AND LOAD THOSE THAT APPLY

    //ITERATE THROUGH FEATURE LAYERS AND LOAD THOSE THAT APPLY
        //SEARCHABLE?  EDITING T/F?
}

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
