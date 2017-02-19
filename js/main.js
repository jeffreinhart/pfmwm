require(["esri/tasks/Geoprocessor", "dijit/form/Button",
         "dojo/dom", "dojo/domReady!"],
    function(Geoprocessor, Button,
             dom){
        // Test for geoprocessing services to pull a related attribute
        var gpUrl = "http://2k12carcasstest:6080/arcgis/rest/services/for/pfmwmGp/GPServer/getMgmtPlanAttributesJson";
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
                    console.log(result);
                    dom.byId("results").innerHTML = result.value;
                }
            );
        }

        var runGp = new Button({
            label: "Get related ownership_block globalid",
            onClick: function(){
                // globalid for management_plan record
                var mpGlobalId = dom.byId("mp_globalid").value;
                executeGP(mpGlobalId);
            }
        }, "runGp").startup();
    } // end require
);
