var lcGid  = getCookie("lcGid");
var gridCe;
var gridMp;
var gridPa;

require([
    'dojox/grid/DataGrid', 'dojo/data/ItemFileWriteStore',
    "dojo/domReady!"
], function(
    DataGrid, ItemFileWriteStore
) {
    // Load settings from CONFIG.js
    Config_Load();

    // Form DIV HTML IDs
    var divId = "land_contact_form_div";
    var formId = divId.slice(0,-4);
    
    // Get attributes
    $.ajax({
        url: CONFIG.py.getLandContAttrJson,
        type: "POST",
        data: {"lcgid": lcGid},
        dataType: "jsonp"
    }).done(function(data){
        if(data.status === "OK") {
            var jsonOut = {
                "action": "landContactDetails.html",
                "method": "post",
                "id": formId,
                "html": data.html
            };
            jsonToForm(jsonOut, divId);
            disableForm(formId);

            // Build datagrid for child contact events
            // set up data store
            var dataCe = {
              identifier: "contact_events.globalid",
              items: []
            };
            // add items to data
            $.each(data.ceDgv, function(index, value){
                dataCe.items.push(value);
            });
            // create store
            var storeCe = new ItemFileWriteStore({data: dataCe});
            // set up layout
            var layoutCe = [[
              {'name': 'Date', 'field': 'contact_events.contact_date', 'width': '90px'},
              {'name': 'DNR Staff', 'field': 'dnr_staff', 'width': '150px'},
              {'name': 'Partner Forester', 'field': 'partner_forester', 'width': '150px'},
              {'name': 'Subject', 'field': 'contact_events.subject', 'width': '100px'},
              {'name': 'Contact Type', 'field': 'contact_events.contact_event_type', 'width': '100px'},
              {'name': 'Summary', 'field': 'contact_events.summary', 'width': '150px'},
              {'name': 'Notes', 'field': 'contact_events.notes', 'width': '300px'}
            ]];
            // create grid
            gridCe = new DataGrid({
                id: 'gridCe',
                store: storeCe,
                structure: layoutCe,
                rowSelector: '20px'});
            // append the new grid to the div
            gridCe.placeAt("contact_events_dgv");
            // Call startup() to render the grid
            gridCe.startup();
            // on row click, enable go to details button
            dojo.connect(gridCe, "onRowClick", function() {
                $('#go_contact_event_details').prop("disabled", false);
            });

            // Build datagrid for child stewardship plans
            // set up data store
            var dataMp = {
              identifier: "management_plans.globalid",
              items: []
            };
            // add items to data
            $.each(data.mpDgv, function(index, value){
                dataMp.items.push(value);
            });
            // create store
            var storeMp = new ItemFileWriteStore({data: dataMp});
            // set up layout      
            var layoutMp = [[
              {'name': 'Plan Date', 'field': 'management_plans.plan_date', 'width': '90px'},
              {'name': 'Acres', 'field': 'management_plans.acres_plan', 'width': '70px'},
              {'name': 'Is Owner', 'field': 'is_owner', 'width': '80px'},
              {'name': 'Registered', 'field': 'registered', 'width': '80px'},
              {'name': 'Expiration Date', 'field': 'expiration_date', 'width': '120px'},
              {'name': 'Plan Writer', 'field': 'plan_writer', 'width': '150px'},
              {'name': 'Counties', 'field': 'counties', 'width': '150px'},
              {'name': 'PLS Section', 'field': 'pls_section', 'width': '150px'} 
            ]];
            // create grid
            gridMp = new DataGrid({
                id: 'gridMp',
                store: storeMp,
                structure: layoutMp,
                rowSelector: '20px'});
            // append the new grid to the div
            gridMp.placeAt("stew_plans_dgv");
            // Call startup() to render the grid
            gridMp.startup();
            // on row click, enable go to details button
            dojo.connect(gridMp, "onRowClick", function() {
                $('#go_stew_plan_details').prop("disabled", false);
            });

            // Build datagrid for child project areas
            // set up data store
            var dataPa = {
              identifier: "project_areas.globalid",
              items: []
            };
            // add items to data
            $.each(data.paDgv, function(index, value){
                dataPa.items.push(value);
            });
            // create store
            var storePa = new ItemFileWriteStore({data: dataPa});
            // set up layout      
            var layoutPa = [[
              {'name': 'Start Date', 'field': 'project_areas.anticipated_project_start_date', 'width': '90px'},
              {'name': 'Plan Writer', 'field': 'writer', 'width': '150px'},
              {'name': 'Cost Share Approved', 'field': 'project_areas.total_cost_share_approved', 'width': '150px'},
              {'name': 'Approved By', 'field': 'approver', 'width': '150px'},
              {'name': 'Certified Date', 'field': 'project_areas.practices_certified_date', 'width': '110px'},
              {'name': 'Practices', 'field': 'practices', 'width': '1000px'}
            ]];
            // create grid
            gridPa = new DataGrid({
                id: 'gridPa',
                store: storePa,
                structure: layoutPa,
                rowSelector: '20px'});
            // append the new grid to the div
            gridPa.placeAt("project_areas_dgv");
            // Call startup() to render the grid
            gridPa.startup();
            // on row click, enable go to details button
            dojo.connect(gridPa, "onRowClick", function() {
                $('#go_project_area_details').prop("disabled", false);
            });

            // Done, hide spinner
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

});//end require

function Config_Load() {
    var pageName = "land-contact-details";
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

function goCeDetailsDgv() {
    var rowCeDgv = gridCe.selection.getSelected();
    var ceGid = rowCeDgv[0]["contact_events.globalid"][0];
    console.log(ceGid);
//    goToCeDetails(ceGid);
}// end goCeDetailsDgv

function goMpDetailsDgv() {
    var rowMpDgv = gridMp.selection.getSelected();
    var mpGid = rowMpDgv[0]["management_plans.globalid"][0];
    console.log(mpGid);
    goToMpDetails(mpGid);
}// end goMpDetailsDgv

function goPaDetailsDgv() {
    var rowPaDgv = gridPa.selection.getSelected();
    var paGid = rowPaDgv[0]["project_areas.globalid"][0];
    console.log(paGid);
//    goToPaDetails(paGid);
}// end goPaDetailsDgv