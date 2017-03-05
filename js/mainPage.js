require([
    "esri/dijit/Search", "esri/layers/FeatureLayer",
    "dojo/dom",
    "dojo/domReady!"
], function(
    Search, FeatureLayer,
    dom
){
    Config_Load();
    
    var query = "http://2k12carcasstest:6080/arcgis/rest/services/for/pfmwm_woodlandmgmtplanning/FeatureServer/2/query?where=not+reg_num+%3D+%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=reg_num%2C+globalid&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&gdbVersion=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&f=json"
    var regNumArr = [];
    
    $.ajax({
        url: query
    }).done(function(data) {
        var jsonReturn = JSON.parse(data);
        $.each(jsonReturn.features, function(i, item){
           regNumArr.push({
                "label": item.attributes.reg_num,
                "value": item.attributes.globalid
            });
        });
        
        $("#regNumSearch").autocomplete({
            source: regNumArr,
            select: function(event, ui){
                event.preventDefault();
                $("#regNumSearch").val(ui.item.label)
                $("#selected-globalid").html(ui.item.value)
            }
        });
    });
    
}); // end require

function goStewPlanDetails(){
    document.cookie = "mpGid="+$("#selected-globalid").html();
    window.location.href = "stew-plan-details.html";
}; // end goStewPlanDetails

function Config_Load() {
    var pageName = "main1"
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



