# JavaScript

Custom files in the js folder.

## config.js

Configuration file for starting up the app.  Define whether various tools are on/off.

By default it is accessing tools from Falcon (arcgis.dnr.state.mn.us/gis/template/js/...

But you can copy these files local to your project if you want to customize them.

Creates a CONFIG JSON object with settings for the app. Settings include:
* TITLE - Title of App - shows up on Tab and in title bar.
* VERSION - Version of App.
* DATE - Last Modified Date.
* EXTRANETID - ID of app in extranet.  Used for authentication.
* DESCRIPTION - Description of App -- Could be used in About window?
* PRODUCTION - If True uses Production URLs.  Else uses DEV URLs (Authentication, map layers).
* LAYERS - Define the layers to be added to the map.
* PROJECTTOOLS - Define default buttons/functions to be added to app. Each button gets its own js\t_*.js file.
* CONTACTS - Contact people for the app.

## divEvents.js

Events related to the buttons/panels.  All custom events could be defined here as well. Loaded in main.html, called in main.js.

## login.js

Code for submitting authentication credentials. Leave it for the big dogs.

## main.js

Majority of Code goes here.

## search_bak.js

Search functions. Backup for t_search.js.

## t_about.js

Template About file. Function ```get_Panel()``` returns HTML for slide out from About This Application button.

## t_legend.js

Template legend file. Function ```get_Panel()``` returns HTML for slide out from Legend button.

## t_search.js

Template Search file. Function ```get_Panel()``` returns HTML for slide out from Search button.

Also contains several search functions including:
* Gazetteer ```search_gazetteer()```
* Get Search Results ```getSearchResults()``` gets results from form and displays as a table.
* Select Search Results ```selectSearchResult()``` takes selection from search results table and sets map extent for selected result.
* PLS Input validate ```plsInputValidate()``` checks the input for Township/Range/Section.
* Search PLS ```search_PLS()``` queries Landview Where Service for Township/Range/Section and sets map extent to result.
* Search Bing ```search_Bing()``` uses Microsoft Bing to search a feature and get a valid address and then set map extent.
* Search Coordinates ```search_Coordinates()``` queries Landview Where Service for lat/long coordinates and sets map extent to result. 

## t_splashscreen.js

Template Splashscreen file. Function ```get_Dialog()``` returns HTML for splash screen that opens on load.