var CONFIG = {
  "title": "Private Forest Management Web Module",
  "version": "1.00",
  "date": "20170220",
  "extranetid": "",
  "description": "Private Forest Management forest stewardship plans and forest management projects.",
  "production": "false",
  "layers": [
    {
      "devUrl": "http://2k12carcasstest:6080/arcgis/rest/services/for/pfmwm_woodlandmgmtplanning/FeatureServer/2",
      "prodUrl": "",
      "name": "management_plans",
      "type": "FeatureLayer",
      "searchable": "true",
      "editable": "true",
      "outFields": ["*"],
      "opacity": 0.5
    },
    {
      "devUrl": "http://2k12carcasstest:6080/arcgis/rest/services/for/pfmwm_countypls/MapServer",
      "prodUrl": "",
      "name": "pfmwm_countypls",
      "type": "ArcGISTiledMapServiceLayer",
      "searchable": "false",
      "editable": "false",
      "outFields": ["*"]
    }
  ],
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
