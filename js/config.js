var version = "dev"
// var version = "prod"

var extUrl = "https://dev.dnr.state.mn.us/mndnr/rest/services/";
var pubUrl = "http://arcgis.dev.dnr.state.mn.us/arcgis/rest/services/";

if (version == "prod") {
    var extUrl = "to be added";
    var pubUrl = "to be added";
}

var CONFIG = {
  "title": "Private Forest Management Web Module",
  "version": "1.00",
  "date": "20170220",
  "extranetid": "85",
  "description": "Private Forest Management forest stewardship plans and forest management projects.",
  "production": "false",
  "layers": {
    "management_plans" : {
        "url": extUrl+"for/pfmwm_woodlandmgmtplanning/FeatureServer/1",
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
        "type": "ArcGISTiledMapServiceLayer",
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
