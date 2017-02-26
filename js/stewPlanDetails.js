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
    
    var jsonIn = {
        "action": "stewPlanDetails.html",
        "method": "post",
        "id": formId,
        "html": [
            {
                "type": "hidden",
                "name": "party_contacts.globalid.landcontact",
                "value": "12345"
            },
            {
                "type": "hidden",
                "name": "party_contacts.globalid.planwriter",
                "value": "56546"
            },
            {
                "type": "hidden",
                "name": "managment_plans.globalid",
                "value": "45578"
            },
            {
                "caption": "Land Contact First Name",
                "type": "text",
                "name": "party_contacts.person_first_name.landcontact",
                "value": "Jeff"
            },
            {
                "caption": "Land Contact Last Name",
                "type": "text",
                "name": "party_contacts.person_last_name.landcontact",
                "value": "Reinhart"
            },
            {
                "caption": "Plan Date",
                "type": "text",
                "name": "management_plans.plan_date",
                "datepicker": {
                    "minDate": new Date(1900,1,1)
                },
                'value': "02/27/2017"
            },
            {
                "caption": "Plan Acres",
                "type": "number",
                "name": "management_plans.acres_plan",
                'value': 40
            },
        ]
    }; // end jsonIn
    
    jsonToForm(jsonIn, divId);
                
    disableForm(formId);
    
    esri.hide(dojo.byId("loading"));
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

