class About {
    constructor() {

    }

    get_Panel() {
        return '<div id="about-tab" class="aside-content" style="display:none">' +
            '<div class="aside-inner" align="center">' +
                '<div class="content">' +
                    '<section class="results layers">' +
                        '<h2>About this application:</h2>' +
                        '<br>' +
                        '<div class="dont-break-out">' +
                            '<p align="left">This application allows the user to go to an area of interest either by panning and zooming, or using the search function. If there is a model available there, the user will then be able to click on the stream segment to view model information and download the model. If a model is listed, the user can click on the model for more information. There may be multiple models listed for one stream segment. This includes the original model and updates or LOMRs.</p>' +
                            '<p align="left">The user is responsible for verifying the extent, date, and details of the model. This application is a work in progress and will be updated regularly. DNR staff are working on getting older models included in this application. More information on where models exist can be found on the Floodplain Program’s website at <a href="http://dnr.state.mn.us/waters/watermgmt_section/floodplain/index.html" target="_blank">http://dnr.state.mn.us/waters/watermgmt_section/floodplain/index.html</a>. For more information, please refer to the Help/FAQ button.</p>' +
                        '</div>' +
                    '</section>' +
                '</div>' +
            '</div>' +
            '<a class="close-tab"><i class="glyphicon glyphicon-triangle-right"></i></a>' +
        '</div>';
    }
}
