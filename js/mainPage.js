var pageName = window.location.pathname.split("/").pop();
var regNumArr = [];
var lcArr = [];
var spArr = [];

require([
    "esri/map", "esri/layers/FeatureLayer", "esri/geometry/Extent",
    "dojo/dom",
    "dojo/domReady!"
], function(
    Map, FeatureLayer, Extent,
    dom
){   
    Config_Load();
    
    setEventListeners();
    
    // map for CFM Service Areas
    var bounds = new Extent({
        "xmin":189775,
        "ymin":4816305,
        "xmax":761655,
        "ymax":5472427,
        "spatialReference":{"wkid":26915}
    })
    map = new Map("aor_map", {
        extent: bounds,
        slider: false,
        logo: false,
        isPan: false
    });
    aorConfig = CONFIG.layers.pfm_aors;
    aorFl = new FeatureLayer(aorConfig.url,{
        dataAttributes: aorConfig.outFields
    });
    dojo.connect(aorFl, "onClick", function(evt){
        goToSelStewMap(evt.graphic.attributes.aor_id, pageName);
    })
    map.addLayer(aorFl);
    map.on("load", function(){
        map.disablePan();
    })
    $('#aor_map_container').hide();
    
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
            create: function() {
                $('#regNumSearch').prop("disabled", false);
            },
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
                $('#lcSearch').prop("disabled", false);
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
    }); // end build land contact autocomplete
    
    // build service provider autocomplete
    document.cookie = "spGid=";
    // query url
    var urlSp = CONFIG.tables.party_contacts.url;
    var querySp = "query?where=business_type+<>+'None'&outFields=globalid%2C+person_first_name%2C+person_last_name%2C+business_type&returnGeometry=false&f=pjson";
    var urlQuerySp = urlSp+querySp;
    // get data and build
    $.ajax({
        url: urlQuerySp,
        dataType: "jsonp"
    }).done(function(data) {
        // build autocomplete list
        var jsonFeaturesSp = data.features;
        $.each(jsonFeaturesSp, function(i, item){
           spArr.push({
                "label": buildSpName(item.attributes),
                "value": item.attributes.globalid
            });
        });
        // sort list
        spArr = spArr.sort(compareAutoComplete);
        // on autocomplete for land contact search,
        // show registration number, get globalid
        $("#spSearch").autocomplete({
            source: spArr,
            autoFocus: true,
            create: function() {
                $('#spSearch').prop("disabled", false);
            },
            search: function() {
                // if a new search, reset cookie
                document.cookie = "spGid=";
            },
            select: function(event, ui){
                event.preventDefault();
                $("#spSearch").val(ui.item.label);
                document.cookie = "spGid="+ui.item.value;
            }
        });
    }); // end build service provider autocomplete
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
            document.cookie = "prevpage="+pageName;
            window.location.href = "stew-plan-details.html";
        }
    } else {
        document.cookie = "prevpage="+pageName;
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
            document.cookie = "prevpage="+pageName;
            window.location.href = "land-contact-details.html";
        }
    } else {
        document.cookie = "prevpage="+pageName;
        window.location.href = "land-contact-details.html";
    }
}; // end goLcDetails

function goSpDetails(){
    var spGid = getCookie("spGid");
    if(spGid == ''){
        // didn't pick from autocomplete, check if in array
        var spName = $("#spSearch").val();
        $.each(spArr, function(i, item){
            if(item.label == spName){
                spGid = item.value;
                return false;
            }
        });
        if(spGid == ''){
            $().toastmessage('showToast', {
                type: "warning",
                text: "Name "+spName+" not found. Please search again.",
                stayTime: 3000,
                sticky: false
            }); 
        } else {
            document.cookie = "spGid="+spGid;
            document.cookie = "prevpage="+pageName;
            window.location.href = "service-provider-details.html";
        }
    } else {
        document.cookie = "prevpage="+pageName;
        window.location.href = "service-provider-details.html";
    }
}; // end goSpDetails

function Config_Load() {
    //SET TITLE OF PAGE IN TAB AND IN BANNER
    document.title = CONFIG.title;
    $("#appTitle").text(CONFIG.appTitle);
    
    //ITERATE THROUGH TOOLS AND LOAD THOSE THAT APPLY (just splash page here)
    var firstVisit = getCookie("firstvisit");
    $.each(CONFIG.projectTools, function(index, value) {
        try {            
            if (value.load.includes(pageName) && firstVisit !== "false") {
                loadScript(value.file, loadTool, value);
            }
        }
        catch(err) {
            console.log(err.message);
        }
    });

    // First time through is done, so set cookie to not load splashscreen
    document.cookie = "firstvisit=false";
}; // end Config_Load

