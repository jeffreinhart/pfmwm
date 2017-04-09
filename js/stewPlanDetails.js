var mpGid  = getCookie("mpGid");
var globalidParse = mpGid.slice(1,-1);

require([
    "esri/map", "esri/graphic", 
    "dojo/domReady!"
], function(
    Map, Graphic
) {
    // Load settings from CONFIG.js
    Config_Load();

    // Form DIV HTML IDs
    var divId = "management_plan_form_div";
    var formId = divId.slice(0,-4);
    
    // Get attributes
    $.ajax({
        url: CONFIG.py.getMgmtPlanAttrJson,
        type: "POST",
        data: {"mpgid": mpGid},
        dataType: "jsonp"
    }).done(function(data){
        if(data.status === "OK") {
            var jsonOut = {
                "action": "stewPlanDetails.html",
                "method": "post",
                "id": formId,
                "html": data.html
            };

            jsonToForm(jsonOut, divId);

            disableForm(formId);

            $("#loading").hide();   
        } else {
            $().toastmessage('showToast', {
                type: "warning",
                text: data.status+": "+data.message,
                stayTime: 3000,
                sticky: false
            });
        }
    });                          

    // Start map
    map = new Map("stew-plan-details-map", {
        basemap: "satellite",
        center: [-94, 46.300],
        zoom: 6,
        slider: true,
        logo: false
    });

    // Get feature and add to map
    // need to parse the globalid to handle the curly braces as special characters
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
}