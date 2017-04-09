//var lcGid  = getCookie("lcGid");
var lcGid = '{93335597-03F1-416C-BACD-E5DCE68F903E}';
var gridCe;
var gridMp;
var gridPa;

require([
    "esri/tasks/Geoprocessor",
    'dojox/grid/DataGrid', 'dojo/data/ItemFileWriteStore',
    "dojo/domReady!"
], function(
    Geoprocessor,
    DataGrid, ItemFileWriteStore
) {
    // LOAD SETTINGS FROM CONFIG.JS
    Config_Load();
    
    var jsonIn = 
{
    "html":[
        {
            "type":"hidden",
            "name":"party_contacts.globalid.landcontact",
            "value":"{93335597-03F1-416C-BACD-E5DCE68F903E}"
        },
        {
            "caption":"Land Contact First Name",
            "type":"text",
            "name":"party_contacts.person_first_name.landcontact",
            "value":"Chuck"
        },
        {
            "caption":"Land Contact Last Name",
            "type":"text",
            "name":"party_contacts.person_last_name.landcontact",
            "value":"Rau"
        },
        {
            "caption":"Land Contact Partner First Name",
            "type":"text",
            "name":"party_contacts.spouse_name.landcontact",
            "value":""
        },
        {
            "caption":"Land Contact Business Name",
            "type":"text",
            "name":"party_contacts.business_name.landcontact",
            "value":""
        },
        {
            "caption":"Land Contact Street Address",
            "type":"text",
            "name":"party_contacts.address_line_1.landcontact",
            "value":"11275 West Lake Road"
        },
        {
            "caption":"Land Contact City",
            "type":"text",
            "name":"party_contacts.city.landcontact",
            "value":"Rice"
        },
        {
            "caption":"Land Contact State",
            "type":"text",
            "name":"party_contacts.state_provice_short_name_code.landcontact",
            "value":"MN"
        },
        {
            "caption":"Land Contact Zip",
            "type":"text",
            "name":"party_contacts.postal_code.landcontact",
            "value":"56367"
        },
        {
            "caption":"Land Contact Do Not Mail",
            "type":"text",
            "name":"party_contacts.do_not_mail.landcontact",
            "value":"N"
        },
        {
            "caption":"Land Contact Phone 1",
            "type":"text",
            "name":"party_contacts.phone_line_1.landcontact",
            "value":"(320) 493-9503  "
        }
    ],
    "paDgv":[
        {
            "approver":"Tony Miller",
            "writer":"Tony Miller",
            "project_areas.globalid":"{345D6C60-8FB7-438E-97F0-F47FA411CBA2}",
            "practices":"FOR-2 Forest Improvement",
            "project_areas.anticipated_project_start_date":"2/15/2017",
            "project_areas.practices_certified_date":"",
            "project_areas.total_cost_share_approved":"220.00"
        },
        {
            "approver":"Tony Miller",
            "writer":"Tony Miller",
            "project_areas.globalid":"{58D37B49-973F-462A-B2BC-DC1A29749D07}",
            "practices":"FOR-3 Forest Health and Protection",
            "project_areas.anticipated_project_start_date":"2/16/2017",
            "project_areas.practices_certified_date":"",
            "project_areas.total_cost_share_approved":"700.00"
        }
    ],
    "ceDgv":[
        {
            "contact_events.summary":"",
            "contact_events.globalid":"{8E45F842-898D-483F-8716-E894E9A15CCF}",
            "contact_events.contact_date":"1/31/2017",
            "dnr_staff":"Tony Miller",
            "partner_forester":" ",
            "contact_events.notes":"",
            "contact_events.contact_event_type":"Field Visit",
            "contact_events.subject":"C/S Project"
        },
        {
            "contact_events.summary":"",
            "contact_events.globalid":"{27D44F07-1DC0-4677-B3AE-BB0418022BF2}",
            "contact_events.contact_date":"1/31/2017",
            "dnr_staff":"Tony Miller",
            "partner_forester":" ",
            "contact_events.notes":"",
            "contact_events.contact_event_type":"Field Visit",
            "contact_events.subject":"C/S Project"
        }
    ],
    "mpDgv":[
        {
            "is_owner":"Yes",
            "expiration_date":"6/11/2014",
            "registered":"No",
            "management_plans.acres_plan":228.5,
            "pls_section":"T37N-R31W-S3",
            "counties":"Benton",
            "plan_writer":"  - ",
            "management_plans.plan_date":"6/11/2004",
            "management_plans.globalid":"{B16BE29C-0C3A-4153-8B23-3C8E2A8D4CA5}"
        }
    ]
}

    // FORM ELEMENTS
    var divId = "land_contact_form_div";
    var formId = divId.slice(0,-4);
    
    // GET RESULTS
//    var gp = new Geoprocessor(CONFIG.gpTools.getLcAttributesJson.url);
//
//    function executeGP(lcGidIn){
//        var params = {"party_contact_globalid": lcGidIn};
//        gp.submitJob(params, completeCallback, statusCallback);
//    }
//
//    function statusCallback(jobInfo){
//        console.log(jobInfo.jobStatus);
//    }
//    
//    function completeCallback(jobInfo) {
//        gp.getResultData(
//            jobInfo.jobId,
//            "party_contact_attributes_json",
//            function(result){
//                // Build form for record attributes
//                var jsonIn = result.value;
                var jsonOut = {
                    "action": "landContactDetails.html",
                    "method": "post",
                    "id": formId,
                    "html": jsonIn.html
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
                $.each(jsonIn.ceDgv, function(index, value){
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
                $.each(jsonIn.mpDgv, function(index, value){
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
                $.each(jsonIn.paDgv, function(index, value){
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
                esri.hide(dojo.byId("loading"));
                
//            } // end function for handling gp.getResultData result
//        ) // end gp.getResultData
//    }; // end completeCallback
//    
//    executeGP(lcGid);

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
//    goToMpDetails(mpGid);
}// end goMpDetailsDgv

function goPaDetailsDgv() {
    var rowPaDgv = gridPa.selection.getSelected();
    var paGid = rowPaDgv[0]["project_areas.globalid"][0];
    console.log(paGid);
//    goToPaDetails(paGid);
}// end goPaDetailsDgv