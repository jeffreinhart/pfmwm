class About {
    constructor() {

    }

    get_Panel() {
        return '<div id="about-tab" class="aside-content" style="display:none">' +
            '<div class="aside-inner" align="center">' +
                '<div class="content">' +
                    '<section class="results layers">' +
                        '<h2>About this map:</h2>' +
                        '<br>' +
                        '<div class="dont-break-out p-left">' +
                            '<p>This map page allows the user to go to an area of interest either by panning and zooming or by using the Search pane.</p>' +
                            '<p>Search functions include by location (e.g. a state park), address (more complete addresses get better results), or public land survey section.</p>' +
                            '<p>The base map can be changed using the buttons at the bottom of the page. Other layers can be turned off and on in the Legend pane.</p>' +
                            '<p>To get more details about a feature on the map, click the feature for a popup that includes a summary and a Go To Details button.</p>' +
                        '</div>' +
                    '</section>' +
                '</div>' +
            '</div>' +
            '<a class="close-tab"><i class="glyphicon glyphicon-triangle-right"></i></a>' +
        '</div>';
    }
}
