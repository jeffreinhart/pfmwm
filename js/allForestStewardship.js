//STANDARD GLOBAL VARIABLES
var map;

//CUSTOM GLOBAL VARIABLES
var lastFl; // last feature layer to load, hide spinner on update-end

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
    map = new Map("map", {
        basemap: "satellite",
        center: fullPageZoom[0],
        zoom: fullPageZoom[1],
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
        if(lastFl == null){
            // no layers to wait for, so just hide it
            esri.hide(dojo.byId("loading"));
        } else {
            // layer to wait for, so let that finish updating first
            lastFl.on("update-end", function(e) {
                esri.hide(dojo.byId("loading"));
            });
        };// end if else hide spinner
    });// end map.on("load"...
}); // end require

//ADD HOME BUTTON (ZOOM TO STATE)
function addHomeSlider() {
    //let's add the home button slider as a created class, requrires dom-Attr
    dojo.create("div", {
        className: "esriSimpleSliderHomeButton",
        title: 'Zoom to Full Extent',
        onclick: function() {
            map.centerAndZoom(fullPageZoom[0],fullPageZoom[1]);
        }
    }, dojo.query(".esriSimpleSliderIncrementButton")[0], "after");
}

function Config_Load() {
    // pageName defines which tools load in which page
    var pageName = "all-forest-stewardship";
    // lastFlName defines which featureLayer will trigger hiding the spinner
    var lastFlName = "management_plans";
    
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
                        id: value.name,
                        opacity: value.opacity
                    });
                    if(value.name == lastFlName){
                        // Assing layer to global, will be last to load, so on
                        // update-end, stop spinner
                        lastFl = map.addLayer(fl);
                    } else {
                        map.addLayer(fl);
                    }
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
            if (value.load.includes(pageName)) {
                loadScript(value.file, loadTool, value);
            }
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