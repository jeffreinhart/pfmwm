//STANDARD GLOBAL VARIABLES
var map;

//CUSTOM GLOBAL VARIABLES
var lastFl; // last feature layer to load, hide spinner on update-end

require([
    "esri/map", "esri/layers/FeatureLayer", "esri/InfoTemplate",
    "dojo/domReady!","esri/virtualearth/VEGeocoder"
], function(
    Map, FeatureLayer, InfoTemplate
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
            $("#loading").hide();
        } else {
            // layer to wait for, so let that finish updating first
            lastFl.on("update-end", function(e) {
                $("#loading").hide();
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
    var pageName = "all-management-projects";
    
    //SET TITLE OF PAGE IN TAB AND IN BANNER
    document.title = CONFIG.title;
    $("#appTitle").text(CONFIG.appTitle);
       
    // add county_pls tiled map service
    ctyplsConfig = CONFIG.layers.pfmwm_countypls;
    var ctyplsFl = new esri.layers.ArcGISTiledMapServiceLayer(ctyplsConfig.url);
    map.addLayer(ctyplsFl);
    
    // add project areas layer
    var infoTemplatePa = new esri.InfoTemplate(
        'Project Area Info',
        'Start Date: ${anticipated_project_start_date:dateToMMDDYYYY}<br>' +
        'Cost Share Amount: ${total_cost_share_approved:numberToFixed2}<br>' +
        '<button type="button" onclick="goToPaDetails(\'${globalid}\')">' +
            'Go To Details</button>'
    );
    paConfig = CONFIG.layers.project_areas;
    var paFl = new esri.layers.FeatureLayer(paConfig.url, {
        mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
        outFields : paConfig.outFields,
        infoTemplate: infoTemplatePa,
        id: paConfig.name,
        opacity: paConfig.opacity
    });
    lastFl = map.addLayer(paFl);
 
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
} // end Config_Load
