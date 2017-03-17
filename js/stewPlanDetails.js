var mpGid  = getCookie("mpGid");

require([
    "esri/tasks/Geoprocessor",
    "dojo/parser", "dojo/json", "dojo/dom",
    "dojo/domReady!"
], function(
    Geoprocessor,
    parser, JSON, dom
) {
    // LOAD SETTINGS FROM CONFIG.JS
    Config_Load();

    // BUILD FORM
    var divId = "management_plan_form_div";
    var formId = divId.slice(0,-4);
    
    // GET RESULTS
    var gpUrl = "https://dev.dnr.state.mn.us/mndnr/rest/services/for/pfmwmGp/GPServer/getMgmtPlanAttributesJson";
    var gp = new Geoprocessor(gpUrl);

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
                var jsonIn = result.value
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
    
});//end require


function Config_Load() {
    var pageName = "stew-plan-details"
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