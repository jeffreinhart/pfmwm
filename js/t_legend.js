class CustomLegend {
    constructor() {

    }

    get_Panel() {
        var layerCbx = "";
        
        if(map._layers.management_plans){
            layerCbx = '<input type="checkbox" id="cbx_management_plans" checked="checked"> Forest Stewardship Plans' +
                       '<div class="legend_boxes" id="management_plans_legend"></div>' 
        };
        if(map._layers.project_areas){
            layerCbx = '<input type="checkbox" id="cbx_project_areas" checked="checked"> Project Areas' +
                       '<div class="legend_boxes" id="project_areas_legend"></div>' 
        };
            
        return '<div id="legend-tab" class="aside-content" style="display:none">' +
            '<div class="aside-inner" align="center">' +
                '<div class="full-height">' +
                    '<div>' +
                        '<div class="section-sub-header"><h2>My Legend</h2></div>' +
                        '<br>' +
                        '<div align="left">' +
                            '<input type="checkbox" id="cbx_county_pls" checked="checked"> Counties and PLS' +
                            '<div class="legend_boxes" id="county_pls_legend"></div>' +
                            layerCbx +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<a class="close-tab"><i class="glyphicon glyphicon-triangle-right"></i></a>' +
        '</div>';
    }
}
