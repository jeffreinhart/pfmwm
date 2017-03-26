var regNumArr = [];
var lcArr = [];

require([
    "dojo/dom",
    "dojo/domReady!"
], function(
    dom
){   
    Config_Load();
    
    setEventListeners();
    
    // build registration number autocomplete
    document.cookie = "mpGid=";
    // query url
    var urlMp = CONFIG.layers.management_plans.url;
    var queryMp = "query?where=not+reg_num+%3D+%27%27&outFields=reg_num%2C+globalid&returnGeometry=false&orderByFields=reg_num&f=json";
    var urlQueryMp = urlMp+queryMp;
    // get data and build
    $.ajax({
        url: urlQueryMp,
        dataType: "jsonp"
    }).done(function(data) {
        // build autocomplete list
        var jsonFeaturesMp = data.features;
        $.each(jsonFeaturesMp, function(i, item){
           regNumArr.push({
                "label": item.attributes.reg_num,
                "value": item.attributes.globalid
            });
        });
        // on autocomplete for registration number search,
        // show registration number, get globalid
        $("#regNumSearch").autocomplete({
            source: regNumArr,
            minLength: 2,
            autoFocus: true,
            search: function() {
                // if a new search, reset cookie
                document.cookie = "mpGid=";
            },
            select: function(event, ui){
                event.preventDefault();
                $("#regNumSearch").val(ui.item.label);
                document.cookie = "mpGid="+ui.item.value;
            }
        });
    });
        
    // build land contact autocomplete
    document.cookie = "lcGid=";
    // query url
    var urlLc = CONFIG.tables.party_contacts.url;
    var queryLc = "query?where=business_type+%3D+%27None%27&outFields=globalid%2C+person_first_name%2C+person_middle_name%2C+person_last_name%2C+business_name%2C+person_name_prefix%2C+spouse_name&returnGeometry=false&f=pjson";
    var urlQueryLc = urlLc+queryLc;
    // get data and build
    $.ajax({
        url: urlQueryLc,
        dataType: "jsonp"
    }).done(function(data) {
        // build autocomplete list
        var jsonFeaturesLc = data.features;
        $.each(jsonFeaturesLc, function(i, item){
           lcArr.push({
                "label": buildLcName(item.attributes),
                "value": item.attributes.globalid
            });
        });
        // sort list
        lcArr = lcArr.sort(compareAutoComplete);
        // on autocomplete for land contact search,
        // show registration number, get globalid
        $("#lcSearch").autocomplete({
            source: lcArr,
            autoFocus: true,
            create: function() {
                $("#loading").hide();
            },
            search: function() {
                // if a new search, reset cookie
                document.cookie = "lcGid=";
            },
            select: function(event, ui){
                event.preventDefault();
                $("#lcSearch").val(ui.item.label);
                document.cookie = "lcGid="+ui.item.value;
            }
        });
    }); // end build registration number autocomplete
}); // end require

function goStewPlanDetails(){
    var mpGid = getCookie("mpGid");
    if(mpGid == ''){
        // didn't pick from autocomplete, check if in array
        var regNum = $("#regNumSearch").val();
        $.each(regNumArr, function(i, item){
            if(item.label == regNum){
                mpGid = item.value;
                return false;
            }
        });
        if(mpGid == ''){
            $().toastmessage('showToast', {
                type: "warning",
                text: "Registration Number "+regNum+" not found. Please search again.",
                stayTime: 3000,
                sticky: false
            }); 
        } else {
            document.cookie = "mpGid="+mpGid;
            window.location.href = "stew-plan-details.html";
        }
    } else {
        window.location.href = "stew-plan-details.html";
    }
}; // end goStewPlanDetails

function goLcDetails(){
    var lcGid = getCookie("lcGid");
    if(lcGid == ''){
        // didn't pick from autocomplete, check if in array
        var lcName = $("#lcSearch").val();
        $.each(lcArr, function(i, item){
            if(item.label == lcName){
                lcGid = item.value;
                return false;
            }
        });
        if(lcGid == ''){
            $().toastmessage('showToast', {
                type: "warning",
                text: "Name "+lcName+" not found. Please search again.",
                stayTime: 3000,
                sticky: false
            }); 
        } else {
            document.cookie = "lcGid="+lcGid;
//            window.location.href = "land-contact-details.html";
            console.log(document.cookie);
        }
    } else {
//        window.location.href = "land-contact-details.html";
        console.log(document.cookie);
    }
}; // end goLcDetails

function Config_Load() {
    var pageName = "main1" // set back to "main" to get splash page going
    //SET TITLE OF PAGE IN TAB AND IN BANNER
    document.title = CONFIG.title;
    $("#appTitle").text(CONFIG.title);

    //ITERATE THROUGH TOOLS AND LOAD THOSE THAT APPLY (just splash page here)
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
}; // end Config_Load

