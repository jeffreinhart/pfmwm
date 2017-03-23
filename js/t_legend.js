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
                        '<div align="left">' +
//                            '<form>' +
                            '<input type="checkbox" id="cbx_county_pls" checked="checked"> Counties and PLS' +
                            '<div class="legend_boxes" id="county_pls_legend"></div>' +
                            '<input type="checkbox" id="cbx_management_plans" checked="checked"> Forest Stewardship Plans' +
                            '<div class="legend_boxes" id="management_plans_legend"></div>' +
//                            '</form>'+
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<a class="close-tab"><i class="glyphicon glyphicon-triangle-right"></i></a>' +
        '</div>';
    }
}
