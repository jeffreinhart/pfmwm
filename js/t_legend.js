class CustomLegend {
    constructor() {

    }

    get_Panel() {
        return '<div id="legend-tab" class="aside-content" style="display:none">' +
            '<div class="aside-inner" align="center">' +
                '<div class="full-height">' +
                    '<div>' +
                        '<div class="section-sub-header"><h2>My Legend</h2></div>' +
                        '<br>' +
                        '<img id="legendImg" src="assets/img/legend.jpg" alt="Map legend">' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<a class="close-tab"><i class="glyphicon glyphicon-triangle-right"></i></a>' +
        '</div>';
    }
}
