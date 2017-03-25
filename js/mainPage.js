var regNumArr = [];

require([
    "dojo/dom",
    "dojo/domReady!"
], function(
    dom
){   
    Config_Load();
    
    setEventListeners();
    
    document.cookie = "mpGid=";
    
    var url = CONFIG.layers.management_plans.url;
    var query = "query?where=not+reg_num+%3D+%27%27&outFields=reg_num%2C+globalid&returnGeometry=false&orderByFields=reg_num&f=json";
    var urlQuery = url+query;
    
    // build registration number autocomplete
    $.ajax({
        url: urlQuery,
        dataType: "jsonp"
    }).done(function(data) {
        // build autocomplete list
        var jsonFeatures = data.features;
        $.each(jsonFeatures, function(i, item){
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
                $("#loading").hide();
            },
            select: function(event, ui){
                event.preventDefault();
                $("#regNumSearch").val(ui.item.label);
                document.cookie = "mpGid="+ui.item.value;
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
} // end Config_Load
