require(["esri/tasks/Geoprocessor", "dijit/form/Button", "dojo/dom", "dojo/domReady!"], function(Geoprocessor, Button, dom) {
    // Test for geoprocessing services to pull a related attribute
    var resultString = '';
    var gpUrl = "http://2k12carcasstest:6080/arcgis/rest/services/for/getMgmtPlanAttributesJson/GPServer/getMgmtPlanAttributesJson";
    var gp = new Geoprocessor(gpUrl);
    
    function executeGP(mpGid){
        var params = {"management_plan_globalid": mpGid};
        gp.execute(params, displayResults);
        console.log(params);
    }
    
    function displayResults(results, messages){
        resultString = results[0].value;
    }
    
    var runGp = new Button({
        label: "Get related ownership_block globalid",
        onClick: function(){
            
            var mpGlobalId = dom.byId("mp_globalid").value;  // globalid for management_plan record
            executeGP(mpGlobalId);

            dom.byId("results").innerHTML = resultString;
        }
    }, "runGp").startup();
});
