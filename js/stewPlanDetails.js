var mpGid  = getCookie("mpGid");

require([
    "esri/tasks/Geoprocessor", "esri/map", "esri/graphic", 
    "dojo/domReady!"
], function(
    Geoprocessor, Map, Graphic
) {
    // LOAD SETTINGS FROM CONFIG.JS
    Config_Load();

    // BUILD FORM
    var divId = "management_plan_form_div";
    var formId = divId.slice(0,-4);
    
    // GET RESULTS
    var gp = new Geoprocessor(CONFIG.gpTools.getMgmtPlanAttributesJson.url);

    function executeGP(mpGid){
        var params = {"management_plan_globalid": mpGid};
        gp.submitJob(params, completeCallback, statusCallback);
    }

    function statusCallback(jobInfo){
        console.log(jobInfo.jobStatus);
    }
    
    function completeCallback(jobInfo) {
        gp.getResultData(
            jobInfo.jobId,
            "management_plan_attributes_json",
            function(result){
                var jsonIn = result.value;
                var jsonOut = {
                    "action": "stewPlanDetails.html",
                    "method": "post",
                    "id": formId,
                    "html": jsonIn.html
                };

                jsonToForm(jsonOut, divId);
                
                disableForm(formId);
    
                esri.hide(dojo.byId("loading"));                
            } // end function for handling gp.getResultData result
        ) // end gp.getResultData
    }; // end completeCallback
    
    executeGP(mpGid);
    
    map = new Map("stew-plan-details-map", {
        basemap: "satellite",
        center: [-94, 46.300],
        zoom: 6,
        slider: true,
        logo: false
    });

    // need to parse the globalid to handle the curly braces as special characters
    globalidParse = mpGid.slice(1,-1);
    query = "query?where=globalid+%3D+%27%7B"+globalidParse+"%7D%27&geometryType=esriGeometryPolygon&outSR=4326&returnGeometry=true&f=pjson"
    $.ajax({
        url: CONFIG.layers.management_plans.url+query,
        dataType: "jsonp"
    }).done(function(data) {
        var polygon = {
            "geometry": data.features[0].geometry,
            "spatialReference": data.spatialReference,
            "symbol":{
                "color":[255,255,153,60],
                "outline":{
                    "color":[255,255,0,255],
                    "width":2,
                    "type":"esriSLS",
                    "style":"esriSLSSolid"},
                "type":"esriSFS",
                "style":"esriSFSSolid"}
        }
        var graphic = new Graphic(polygon);
        map.graphics.add(graphic);
        map.setExtent(graphic._extent, true);
    });
});//end require

function Config_Load() {
    var pageName = "stew-plan-details";
    //SET TITLE OF PAGE IN TAB AND IN BANNER
    document.title = CONFIG.title;
    $("#appTitle").text(CONFIG.title);

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