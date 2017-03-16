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
       
    $.ajax({
        url: "https://dev.dnr.state.mn.us/arcgis/rest/services/for/pfmwm_woodlandmgmtplanning/FeatureServer/2/query?where=not+reg_num+%3D+%27%27&outFields=reg_num%2C+globalid&returnGeometry=false&orderByFields=reg_num&f=json",
        dataType: "jsonp"
    }).done(function(data) {
        var jsonFeatures = data.features;
        $.each(jsonFeatures, function(i, item){
           regNumArr.push({
                "label": item.attributes.reg_num,
                "value": item.attributes.globalid
            });
        });
        
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
    });
    
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