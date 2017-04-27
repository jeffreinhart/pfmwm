var version = "dev"
// var version = "prod"

// CARRION (pfmwm services)
var extUrl = "https://dev.dnr.state.mn.us/mndnr/rest/services/";
// CARCASSTEST (image service)
var pubUrl = "https://arcgis.dev.dnr.state.mn.us/arcgis/rest/services/";
var pyUrl = "https://dev.dnr.state.mn.us/for/pfmwmScripts/"

if (version == "prod") {
    // SALMON (pfmwm services)
    var extUrl = "http://arcgis.intranet.mndnr.dnr.state.mn.us/arcgis/rest/services/";
    // CARCASSTEST (image service)
    var pubUrl = "http://arcgis.dev.dnr.state.mn.us/arcgis/rest/services/";
}

var CONFIG = {
    "title": "PFMWM: Minnesota DNR",
    "appTitle": "Private Forest Management Web Module",
    "version": "1.00",
    "date": "20170416",
    "extranetid": "85",
    "description": "This application provides access to key information included in the DNR Forestry Private Forest Management Module. Not all stewardship plans have been mapped, and only mapped plans are included in this application. Users can view most information about Land Contacts, Service Providers, Forest Stewardship Plans, Forest Management Projects, and Contact Events.",
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
        "project_areas": {
            "url": extUrl+"for/pfmwm_woodlandmgmtplanning/FeatureServer/0/",
            "name": "project_areas",
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
        },
        "pfm_aors":{
            "url": pubUrl+"for/pfm_aors/MapServer/0/",
            "name": "pfm_aors",
            "type": "FeatureLayer",
            "searchable": "true",
            "editable": "false",
            "outFields": ["aor_id","aor","frstr"]
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
    "py": {
        "getMgmtPlanAttrJson": pyUrl+"get_mgmt_plan_attributes_json.py",
        "getLandContAttrJson": pyUrl+"get_lc_attributes_json.py",
        "getProjectAreaAttrJson": pyUrl+"get_project_area_attributes_json.py",
        "getServiceProviderAttrJson": pyUrl+"get_sp_attributes_json.py"
    },
    "projectTools": [
        {
            "name": "about",
            //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_about.js", //Dev file
            "file": "js/t_about.js", //Local file
            "type": "button",
            "load": [
                "all-forest-stewardship.html",
                "all-management-projects.html",
                "select-forest-stewardship.html"]
        },
        {
            "name": "legend",
            //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_legend.js", //Dev file
            "file": "js/t_legend.js", //Local file
            "type": "button",
            "load": [
                "all-forest-stewardship.html",
                "all-management-projects.html",
                "select-forest-stewardship.html"]
        },
        {
            "name": "search",
            //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_search.js", //Dev file
            "file": "js/t_search.js", //Local file
            "type": "button",
            "load": [
                "all-forest-stewardship.html",
                "all-management-projects.html",
                "select-forest-stewardship.html"]
        },
        {
            "name": "splashscreen",
            //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_splashscreen.js", //Dev file
            "file": "js/t_splashscreen.js", //Local file
            "type": "splashscreen",
            "load": ["main.html"]
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
