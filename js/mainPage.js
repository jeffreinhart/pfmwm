require([
    "esri/dijit/Search", "esri/layers/FeatureLayer",
    "dojo/dom",
    "dojo/domReady!"
], function(
    Search, FeatureLayer,
    dom
){
    Config_Load();
    
    var search = new Search({
        sources: []
    }, "search");

    search.on("load", function(){
        var sources = search.sources;
        sources.push({
            featureLayer: new FeatureLayer(CONFIG.layers[0].devUrl),
            searchFields: ["reg_num"],
            suggestionTemplate: "${reg_num}",
            exactMatch: true,
            outFields: ["globalid", "reg_num"],
            enableSuggestions: true
        });
        
        search.set("sources", sources);
    }); // end search on load
    
    search.startup();

    search.on("select-result", function(e){
        dom.byId("search_input").value = e.result.feature.attributes.reg_num;
    }); // end search on results

    search.on("search-results", function(e){
        console.log("search-result", e);
    }); // end search on results
    
}); // end require


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



