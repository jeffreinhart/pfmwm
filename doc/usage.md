# Usage

These docs were last updated in reference to the 1/25/2017 commit.

Once you have cloned or downloaded the DNR Web App Template, creating a site or app
usually involves the following:

1. Update code.
2. ...
3. Profit!

## Basic structure

A basic DNR Web App initially looks something like this:

```
.
├── assets
│   ├── img
│   ├── Thumbs.db
│   └── Toolbox.tbx
├── css
│   ├── dnrcss.css
│   ├── dropzone.css
│   ├── filters.css
│   ├── filters.min.css
│   ├── jquery-ui-1.10.2.custom.css
│   ├── jquery-ui.css
│   ├── jquery.selectBoxIt.css
│   ├── jquery.toastmessage.css
│   ├── login.css
│   ├── nanoscroller.css
│   └── signup.css
├── doc
├── font
├── js
│   ├── bootstrap-3.3.6
│   ├── libs
│   ├── config.js
│   ├── divEvents.js
│   ├── login.js
│   ├── main.js
│   ├── search_bak.js
│   ├── t_about.js
│   ├── t_legend.js
│   ├── t_search.js
│   └── t_splashscreen.js
├── logs
├── config.json
├── index.html
├── main.html
├── proxy.config
└── signup.html
```

What follows is a general overview of each major part and how to use them.

### ASSETS

Images and random other project specific files.

#### IMG

All images for app. Includes arrows, DNR logos, background tiles, favicon.ico, banners, etc.

#### Toolbox.tbx

Geoprocessing service tools go here?

### CSS

CSS files for app. [About the CSS](css.md)

### FONT

Fonts for app.

Includes:
* fontawesome
* proximanova

### JS

JavaScript files related to app. [About the JS](js.md)

### LOGS

Error log file is written here (for proxy stuff (proxy.ashx line 144)).

### INDEX.HTML

Authentication screen.  If no authentication required then remove INDEX.HTML, SIGNUP.HTML, and LOGIN.JS.

Also remove the LogOut button from MAIN.HTML (line 45)

### MAIN.HTML

Main page for your app.

### SIGNUP.HTML

Used with INDEX.HTML.

### PROXY.ASHX

Proxy Stuff.  It is set up to accept calls from all of our server stacks so you could leave it as-is.  

Otherwise you can restrict it further on line 53.

### PROXY.CONFIG

Proxy Stuff.  Set up to accept calls from all 3 server stacks.  so you can leave it as-is. 

Otherwise you can restrict it further on line 17.