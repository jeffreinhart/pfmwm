var pageName = window.location.pathname.split("/").pop();
var map;

require([
    "esri/map", "esri/layers/FeatureLayer", "esri/InfoTemplate",
    "esri/tasks/FeatureSet",
    "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
    "dojo/_base/Color", "esri/renderers/SimpleRenderer",
    "esri/graphicsUtils",
    "dojo/domReady!","esri/virtualearth/VEGeocoder"
], function(
    Map, FeatureLayer, InfoTemplate,
    FeatureSet,
    SimpleFillSymbol, SimpleLineSymbol,
    Color, SimpleRenderer,
    graphicsUtils
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
    
    // Renderer for feature layer since not defined for feature set
    var sfs = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([132,0,168,1]),
            2),
        new Color([223,115,255,0.25])
    );
    var renderer = new SimpleRenderer(sfs);

    map.on("load", function(evt) {
        // add county_pls tiled map service
        ctyplsConfig = CONFIG.layers.pfmwm_countypls;
        var ctyplsFl = new esri.layers.ArcGISTiledMapServiceLayer(ctyplsConfig.url);
        map.addLayer(ctyplsFl);

        // add management plans layer
        var infoTemplateMp = new esri.InfoTemplate(
            'Plan Info',
            'Plan Date: ${plan_date:dateToMMDDYYYY}<br>' +
            'Plan Acres: ${acres_plan:numberToFixed1}<br>' +
            '<button type="button" onclick="goToMpDetails(\'${globalid}\', \''+pageName+'\')">' +
                'Go To Details</button>'
        );
        // query management_plans feature layer
        mpConfig = CONFIG.layers.management_plans;
        aorId = getCookie("aorId");
        queryUrl = mpConfig.url+"query?where=aor_id+%3D+%27"+aorId+"%27&geometryType=esriGeometryEnvelope&outFields=objectid%2Cglobalid%2Cplan_date%2Cacres_plan&returnGeometry=true&outSR=4326&f=pjson";
        // run query and add to map
        $.ajax({
            url: queryUrl,
            dataType: "jsonp"
        }).done(function(data){
            // feature set for JSON return
            var mpFeatureSet = new FeatureSet(data);
            // feature collection to build feature layer
            var featureCollection = {
                layerDefinition: {
                    "geometryType": data.geometryType,
                    "fields": data.fields,
                    "objectIdField": data.objectIdFieldName
                },
                featureSet: mpFeatureSet
            }
            // create feature layer
            var featureLayer = new FeatureLayer(featureCollection,{
                "infoTemplate": infoTemplateMp
            });
            // set renderer, add to map, set extent within edge divs
            featureLayer.setRenderer(renderer);
            var extent = graphicsUtils.graphicsExtent(featureLayer.graphics);
            map.addLayer(featureLayer);
            map.setExtent(extent.expand(1.6));
            
            //LOAD CUSTOM STUFF FROM CONFIG.JS
            Config_Load();
            
            //Set listeners for Standard Div Events -- located in divEvents.js
            setEventListeners();
        });

        //Finished Loading so hide the spinny dealie
        map.on("extent-change", function(e) {
            $("#loading").hide();
        });

        //Add 'Home' button to zoom in/out buttons
        addHomeSlider();
    });// end map.on("load"...)
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
    //SET TITLE OF PAGE IN TAB AND IN BANNER
    document.title = CONFIG.title;
    $("#appTitle").text(CONFIG.appTitle);
 
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
