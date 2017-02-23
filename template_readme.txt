ASSETS - Images and random other project specific files
	IMG - All images for app
CSS - CSS files for app
FONT - Fonts for app
JS - Javascript files related to app
	DIVEEVENTS.JS - Events related to the buttons/panels.  All custom events could be defined here as well.
	MAIN.JS - Majority of Code goes here
	CONFIG.JS - Configuration file for starting up the app.  Define whether various tools are on/off.
			By default it is accessing tools from Falcon (arcgis.dnr.state.mn.us/gis/template/js/...
			But you can copy these files local to your project if you want to customize them.
				TITLE - Title of App - shows up on Tab and in title bar
				VERSION - Version of App
				DATE - Last Modified Date
				EXTRANETID - ID of app in extranet.  Used for authentication
				DESCRIPTION - Description of App -- Could be used in About window?
				PRODUCTION - If True uses Production URLs.  Else uses DEV URLs (Authentication, map layers)
				LAYERS - Define the layers to be added to the map
				PROJECTTOOLS - Define default buttons/functions to be added to app
	LOGIN.JS - Code for submitting authentication credentials
	T_ABOUT.JS - Template About file
	T_LEGEND.JS - Template legend file
	T_SEARCH.JS - Template Search file
	T_SPLASHSCREEN.JS - Template Splashscreen file
LOGS - Error log file is written here (for proxy stuff (proxy.ashx line 144))

INDEX.HTML - Authentication screen.  If no authentication required then remove INDEX.HTML, SIGNUP.HTML, and LOGIN.JS.
		Also remove the LogOut button from MAIN.HTML (line 45)
MAIN.HTML - Main page for your app
SIGNUP.HTML - Used with INDEX.HTML
PROXY.ASHX - Proxy Stuff.  It is set up to accept calls from all of our server stacks so you could leave it as-is.  
		Otherwise you can restrict it further on line 53.
PROXY.CONFIG - Proxy Stuff.  Set up to accept calls from all 3 server stacks.  so you can leave it as-is. 
		Otherwise you can restrict it further on line 17.
TEMPLATE_README.TXT - This file.