var paGid  = getCookie("paGid");
var globalidParse = paGid.slice(1,-1);
require([
    "esri/map", "esri/graphic",
    'dojox/grid/DataGrid', 'dojo/data/ItemFileReadStore',
    "dojo/domReady!"
], function(
    Map, Graphic,
    DataGrid, ItemFileReadStore
) {
    // Load settings from CONFIG.js
    Config_Load();
    
    //Set listeners for Standard Div Events -- located in divEvents.js
    setEventListeners();

    // Form DIV HTML IDs
    var divId = "project_areas_form_div";
    var formId = divId.slice(0,-4);
    
    // Get attributes
    $.ajax({
        url: CONFIG.py.getProjectAreaAttrJson,
        type: "POST",
        data: {"pagid": paGid},
        dataType: "jsonp"
    }).done(function(data){
        if(data.status === "OK") {
            // attributes to form
            var jsonOut = {
                "action": "project-area-details.html",
                "method": "post",
                "id": formId,
                "html": data.html
            };

            jsonToForm(jsonOut, divId);

            disableForm(formId);
            
            // Build datagrid for child project practices
            // set up data store
            var dataPp = {
              identifier: "project_practices.globalid",
              items: []
            };
            // add items to data
            $.each(data.ppDgv, function(index, value){
                dataPp.items.push(value);
            });
            // create store
            var storePp = new ItemFileReadStore({data: dataPp});
            // set up layout, formatter functions defined in pfmwmUtils.js
            var layoutPp = [[
                {'name': 'Ant. Start Date', 'field': 'project_practices.anticipated_practice_start_date', 'width': '120px', formatter: formatDate},
                {'name': 'Practice', 'field': 'project_practices.practice', 'width': '300px'},
                {'name': 'Component', 'field': 'project_practices.component', 'width': '150px'},
                {'name': 'Task', 'field': 'project_practices.task', 'width': '200px'},
                {'name': 'Subtask', 'field': 'project_practices.subtask', 'width': '200px'},
                {'name': 'Units Proposed', 'field': 'project_practices.proposed_component_amount', 'width': '120px'},
                {'name': 'Unit', 'field': 'project_practices.component_unit', 'width': '90px'},
                {'name': 'Cost Per Unit', 'field': 'project_practices.cost_per_unit', 'width': '110px', formatter: formatCurrency},
                {'name': 'Est. Cost', 'field': 'project_practices.estimated_total_cost', 'width': '120px', formatter: formatCurrency},
                {'name': 'Cost Share Rqst', 'field': 'project_practices.requesting_cost_share', 'width': '120px'},
                {'name': 'Cost Share Rate', 'field': 'project_practices.cost_share_rate', 'width': '120px', formatter: formatCurrency},
                {'name': 'Cost Share Rec', 'field': 'project_practices.cost_shares_recommended', 'width': '140px', formatter: formatCurrency},
                {'name': 'Completion Date', 'field': 'project_practices.completion_date', 'width': '130px', formatter: formatDate},
                {'name': 'Units Completed', 'field': 'project_practices.completed_component_amount', 'width': '130px'},
                {'name': 'Cost Share Earned', 'field': 'project_practices.cost_shares_earned', 'width': '140px', formatter: formatCurrency},
                {'name': 'Comments', 'field': 'project_practices.comments', 'width': '300px'}
            ]];
            // create grid
            gridPp = new DataGrid({
                id: 'gridPp',
                store: storePp,
                structure: layoutPp,
                rowSelector: '20px',
                sortInfo: 1});
            // append the new grid to the div
            gridPp.placeAt("project_practices_dgv");
            // Call startup() to render the grid
            gridPp.startup();
            
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
    map = new Map("project-area-details-map", {
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
        url: CONFIG.layers.project_areas.url+query,
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
    var pageName = "project-area-details";
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
}