//var role = checkLoginGetRole();
var fullPageZoom = [[-94, 46.300],6]

function checkLoginGetRole() {
    var role = getCookie("role");
    if(role == '') {
        alert('You are not logged in. Returning to login page.');
        window.location = 'index.html';
    } else {
        console.log(role);
        return role;
    }
} // end checkLoginGetRole

function loadScript(url, callback, obj)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    // Once the script has been loaded the callback function (loadTool) is fired
    //   to insert HTML code into the app and set up listeners
    script.onreadystatechange = function() {callback(obj); }
    script.onload = function() {callback(obj);}

    // Fire the loading
    head.appendChild(script);
}

var loadTool = function(value) {
    //CREATE NEW INSTANCE OF OBJECT
    switch(value.name) {
        case "about":
            pT = new About();
            break;
        case "legend":
            pT = new CustomLegend();
            break;
        case "search":
            pT = new Search();
            break;
        case "splashscreen":
            pT = new SplashScreen();
            break;
        default:

    }
    switch (value.type) {
        case "button":
            //GET PANEL HTML AND ADD IT TO PANELS
            panelHTML = pT.get_Panel();
            $('#main-nav').append(panelHTML);
            break;
        case "splashscreen":
            dialogHTML = pT.get_Dialog();
            $('#map-root').append(dialogHTML);
            setCustomEventListeners();
            $('#Dialog').modal('show');
            return;
            break;
        default:
    }

    setCustomEventListeners();
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookies() {
    var expire = '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "email" + expire;
    document.cookie = "role" + expire;
    document.cookie = "fullname" + expire;
    document.cookie = "firstvisit" + expire;
    document.cookie = "prevpage" + expire;
    document.cookie = "lcGid" + expire;
    document.cookie = "mpGid" + expire;
    document.cookie = "paGid" + expire;
    document.cookie = "aorId" + expire;
    email = "";
    role = "";
    fullname = "";
    console.log('asd email=' + email + '  role=' + role);
    window.location.replace("index.html");
}

function jsonToForm(jsonIn, divId){
    $(function() {
        // Generate a form
        $("#"+divId).dform(jsonIn);
    });
} // end jsonToForm

function disableForm(formID){
    $('#'+formID).children(':input').attr('disabled', 'disabled');
}

function goToMpDetails(mpGidIn, prevPage) {
    document.cookie = "mpGid="+mpGidIn;
    document.cookie = "prevpage="+prevPage;
    window.location.href = "stew-plan-details.html";
}

function goToPaDetails(paGidIn, prevPage) {
    document.cookie = "paGid="+paGidIn;
    document.cookie = "prevpage="+prevPage;
    window.location.href = "project-area-details.html";
}

function goToSelStewMap(aorIdIn, prevPage){
    document.cookie = "aorId="+aorIdIn;
    document.cookie = "prevpage="+prevPage;
    window.location.href = "select-forest-stewardship.html";
}

function ceDetailsOpen(rowDgv) {
    console.log(rowDgv);
    var htmlStr = '<h2>Contact Event Details</h2>' +
        '<form>'+
            '<input id="contact_events.globalid" type="hidden" value="'+
            rowDgv[0]["contact_events.globalid"][0]+'" >'+
            '<div class="row">'+
                '<div class="col-xs-4">'+
                    '<label for="contact_events.contact_date">Date</label>'+
                '</div>'+
                '<div class="col-xs-8">'+
                    '<input id="contact_events.contact_date" type="text" value="'+
                    rowDgv[0]["contact_events.contact_date"][0]+
                    '" disabled>'+
                '</div>'+
            '</div>'
    switch(pageName){
        case 'land-contact-details.html':
            htmlStr += '<div class="row">'+
                '<div class="col-xs-4">'+
                    '<label for="dnr_staff">DNR Staff</label>'+
                '</div>'+
                '<div class="col-xs-8">'+
                    '<input id="dnr_staff" type="text" value="'+
                    rowDgv[0]["dnr_staff"][0]+
                    '" disabled>'+
                '</div>'+
            '</div>'
        break;
        case 'service-provider-details.html':
            htmlStr += '<div class="row">'+
                '<div class="col-xs-4">'+
                    '<label for="land_contact">Land Contact</label>'+
                '</div>'+
                '<div class="col-xs-8">'+
                    '<input id="land_contact" type="text" value="'+
                    rowDgv[0]["land_contact"][0]+
                    '" disabled>'+
                '</div>'+
            '</div>'
        break;
    } // end switch
    htmlStr += ''+
            '</div>'+'<div class="row">'+
                '<div class="col-xs-4">'+
                    '<label for="partner_forester">Partner Forester</label>'+
                '</div>'+
                '<div class="col-xs-8">'+
                    '<input id="partner_forester" type="text" value="'+
                    rowDgv[0]["partner_forester"][0]+
                    '" disabled>'+
                '</div>'+
            '</div>'+
            '</div>'+'<div class="row">'+
                '<div class="col-xs-4">'+
                    '<label for="contact_events.contact_events.subject">Subject</label>'+
                '</div>'+
                '<div class="col-xs-8">'+
                    '<input id="contact_events.subject" type="text" value="'+
                    rowDgv[0]["contact_events.subject"][0]+
                    '" disabled>'+
                '</div>'+
            '</div>'+
            '</div>'+'<div class="row">'+
                '<div class="col-xs-4">'+
                    '<label for="contact_events.contact_event_type">Type</label>'+
                '</div>'+
                '<div class="col-xs-8">'+
                    '<input id="contact_events.contact_event_type" type="text" value="'+
                    rowDgv[0]["contact_events.contact_event_type"][0]+
                    '" disabled>'+
                '</div>'+
            '</div>'+
            '</div>'+'<div class="row">'+
                '<div class="col-xs-4">'+
                    '<label for="contact_events.summary">Summary</label>'+
                '</div>'+
                '<div class="col-xs-8">'+
                    '<input id="contact_events.summary" type="text" value="'+
                    rowDgv[0]["contact_events.summary"][0]+
                    '" disabled>'+
                '</div>'+
            '</div>'+
            '</div>'+'<div class="row">'+
                '<div class="col-xs-4">'+
                    '<label for="contact_events.notes">Notes</label>'+
                '</div>'+
                '<div class="col-xs-8">'+
                    '<input id="contact_events.notes" type="text" value="'+
                    rowDgv[0]["contact_events.notes"][0]+
                    '" disabled>'+
                '</div>'+
            '</div>'+
        '</form>'+
        '<button class="btn btn-inline" onclick="ceDetailsCancel()">Cancel</button>';
    $('#contact_event_form').html(htmlStr);
    $('#contact_event_form').show();
}

function ceDetailsCancel() {
    // will likely need to clear objects here
    $('#contact_event_form').hide();
}

function dateToMMDDYYYY(value) {
    date = new Date(value);
    console.log(date);
    mmddyyyy = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' +  date.getUTCFullYear();
    return mmddyyyy;
}

function numberToFixed1(value) {
    return value.toFixed(1);
};

function numberToFixed2(value) {
    return value.toFixed(2);
};

function buildSpName(spJson){
    // gather variables
    var fName = nullToStr(spJson.person_first_name);
    var lName = nullToStr(spJson.person_last_name);
    var bType = nullToStr(spJson.business_type);
    // out
    return lName+', '+fName+' ('+bType+')';
}; // end function buildSpName

function buildLcName(lcJson){
    // gather variables
    var outName = '';
    var fName = nullToStr(lcJson.person_first_name);
    var mName = nullToStr(lcJson.person_middle_name);
    var lName = nullToStr(lcJson.person_last_name);
    var nPre = nullToStr(lcJson.person_name_prefix);
    var sName = nullToStr(lcJson.spouse_name);
    var bName = nullToStr(lcJson.business_name);
    // conditionals
    if (nPre === 'c/o') {
        // special case for care of
        outName = bName+' c/o '+fName+' '+mName+' '+lName;
    } else if (lName === '' && bName !== '') {
        // no last name, so just business name
        outName = bName;
    } else {
        // without or with spouse name
        if(sName === ''){
            outName = lName+", "+fName+" "+mName;
        } else {
            outName = lName+", "+fName+" "+mName+" & "+sName;
        }
    }
    // trim any whitespace left from '' values
    outName = outName.replace(/\s\s+/g, ' ').trim();
    return outName;
}; // end function buildLcName

function nullToStr(val){
    if(val === null){
        return '';
    } else {
        return val;
    }
};

function compareAutoComplete(a,b) {
    // for sorting list of autocomplete objects
    if (a.label < b.label)
        return -1;
    if (a.label > b.label)
        return 1;
    return 0;
};

// Formatting dates
function formatDate(datum){
    var outDate = '';
    require([
    'dojo/date/stamp', 'dojo/date/locale'
    ], function(
        stamp, locale
    ) {
        if(datum !== ''){
            var d = stamp.fromISOString(datum);
            outDate = locale.format(
                d,
                {selector: 'date', formatLength: 'short', fullYear: true}
            );
        }
    });
    return outDate;
};

function formatCurrency(number){
    return (number).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
};