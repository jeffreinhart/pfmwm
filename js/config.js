var CONFIG = {
  "title": "Sample App",
  "version": "1.46",
  "date": "20161221",
  "extranetid": "78",
  "description": "This is the description of my app",
  "production": "true",
  "layers": [
    {
      "devUrl": "https://arcgis.dev.dnr.state.mn.us/arcgis/rest/services/wld/AnimalDamage_Dyn_Service/MapServer",
      "prodUrl": "https://arcgis.dev.dnr.state.mn.us/arcgis/rest/services/wld/AnimalDamage_Dyn_Service/MapServer",
      "name": "AnimalDamage",
      "type": "ArcGISDynamicMapServiceLayer",
      "searchable": "true",
      "editable": "true",
      "outFields": ["*"]
     } //,
//     {
//       "devUrl": "https://dev.dnr.state.mn.us/arcgis/rest/services/ewr/SpringInventory/FeatureServer/0",
//       "prodUrl": "https://dev.dnr.state.mn.us/arcgis/rest/services/ewr/SpringInventory/FeatureServer/0",
//       "name": "CandidateLayer",
//       "type": "FeatureLayer",
//       "searchable": "true",
//       "editable": "true",
//       "outFields": ["objectid","relateid","survey_name"]
//     }
  ],
  "projectTools": [
    {
      "name": "about",
      //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_about.js", //Dev file
      "file": "js/t_about.js", //Local file
      "type": "button",
      "load": "true"
    },
    {
      "name": "legend",
      //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_legend.js", //Dev file
      "file": "js/t_legend.js", //Local file
      "type": "button",
      "load": "true"
    },
    {
      "name": "search",
      //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_search.js", //Dev file
      "file": "js/t_search.js", //Local file
      "type": "button",
      "load": "true"
    },
    {
      "name": "splashscreen",
      //"file": "https://arcgis.dnr.state.mn.us/gis/template/js/t_splashscreen.js", //Dev file
      "file": "js/t_splashscreen.js", //Local file
      "type": "splashscreen",
      "load": "true"
    }
  ],
  "contacts": [
    {
      "type": "developer",
      "name": "yourUsernameHere" //Your username (e.g. chpoulio)
    },
    {
      "type": "support",
      "name": "supportUsernameHere" //Support username (e.g. jajohnso)
    },
    {
      "type": "users",
      "name": "activeDirectoryUserGroupsHere" //Active directory user groups (e.g. MyAppADGroup)
    }
  ]
}
