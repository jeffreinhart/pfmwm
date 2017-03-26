//var version = "dev"
 var version = "prod"

// CARRION (gp service, maybe pfmwm services)
var gpUrl = "https://dev.dnr.state.mn.us/mndnr/rest/services/";
var extUrl = "https://dev.dnr.state.mn.us/mndnr/rest/services/";
// CARCASSTEST (image service)
var pubUrl = "http://arcgis.dev.dnr.state.mn.us/arcgis/rest/services/";

if (version == "prod") {
    // CARRION (gp service, still needs to be moved)
    var gpUrl = "https://dev.dnr.state.mn.us/mndnr/rest/services/";
    // SALMON (pfmwm services)
    var extUrl = "http://arcgis.intranet.mndnr.dnr.state.mn.us/arcgis/rest/services/";
    // CARCASSTEST (image service)
    var pubUrl = "http://arcgis.dev.dnr.state.mn.us/arcgis/rest/services/";
}

var CONFIG = {
    "title": "Private Forest Management Web Module",
    "version": "1.00",
    "date": "20170220",
    "extranetid": "85",
    "description": "Private Forest Management forest stewardship plans and forest management projects.",
    "production": "false",
    "layers": {
        "management_plans": {
            "url": extUrl+"for/pfmwm_woodlandmgmtplanning/FeatureServer/1/",
            "name": "management_plans",
            "type": "FeatureLayer",
            "searchable": "true",
            "editable": "true",
            "outFields": ["*"],
            "opacity": 0.5
        },
        "pfmwm_countypls": {
            "url": pubUrl+"for/pfmwm_countypls/MapServer",
            "name": "pfmwm_countypls",
            "type": "ArcGISTiledMapServiceLayer"
        }
    },
    "tables": {
        "party_contacts": {
            "url": extUrl+"for/pfmwm_woodlandmgmtplanning/FeatureServer/2/",
            "name": "pfmm.pfmm.PARTY_CONTACTS",
            "type": "Table"
        },
        "contact_events": {
            "url": extUrl+"for/pfmwm_woodlandmgmtplanning/FeatureServer/3/",
            "name": "pfmm.pfmm.contact_events",
            "type": "Table"
        }
    },
    "gpTools": {
        "getMgmtPlanAttributesJson": {
            "url": gpUrl+"for/pfmwmGp/GPServer/getMgmtPlanAttributesJson"
        }
    },
    "projectTools": [
        {
            "name": "about",
            //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_about.js", //Dev file
            "file": "js/t_about.js", //Local file
            "type": "button",
            "load": ["all-forest-stewardship"]
        },
        {
            "name": "legend",
            //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_legend.js", //Dev file
            "file": "js/t_legend.js", //Local file
            "type": "button",
            "load": ["all-forest-stewardship"]
        },
        {
            "name": "search",
            //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_search.js", //Dev file
            "file": "js/t_search.js", //Local file
            "type": "button",
            "load": ["all-forest-stewardship"]
        },
        {
            "name": "splashscreen",
            //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_splashscreen.js", //Dev file
            "file": "js/t_splashscreen.js", //Local file
            "type": "splashscreen",
            "load": ["main"]
        }
    ],
  "contacts": [
    {
        "type": "developer",
        "name": "jereinha"
    },
    {
        "type": "support",
        "name": "jereinha"
    },
    {
        "type": "users",
        "name": "activeDirectoryUserGroupsHere" //Active directory user groups (e.g. MyAppADGroup)
    }
  ]
}
