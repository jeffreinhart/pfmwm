function setEventListeners(){
    $('#logout').click(function() {
       delete_cookies();
       window.location = 'index.html';
    });
    
    $('#backButton').click(function(){
        window.location = 'main.html';
    });
    
    $('#prevButton').click(function(){
        prevPage = getCookie("prevpage");
        window.location = prevPage;
    })
    
    $('#planDetailsButton').click(function(){
        goStewPlanDetails();
    });
    
    $('#lcDetailsButton').click(function(){
        goLcDetails();
    });
    
    $('#spDetailsButton').click(function(){
        goSpDetails();
    });
    
    $('#edit_contact_event_details').click(function(){
        editCeDetailsDgv();
    });
    
    $('#go_stew_plan_details').click(function(){
        goMpDetailsDgv();
    });
    
    $('#go_stew_plan_written_details').click(function(){
        goMpPwDetailsDgv();
    });
    
    $('#go_stew_plan_approved_details').click(function(){
        goMpPaDetailsDgv();
    });
    
    $('#go_project_area_details').click(function(){
        goPaDetailsDgv();
    });
    
    $('#aor_map_close').click(function(){
        $('#aor_map_container').hide();
    })
    
    $('#open_aor_map').click(function(){
        $('#aor_map_container').show();
    })
}

function setCustomEventListeners(){
    //First remove any click events that may exist
    $('#cbtn').unbind('click');
    //Then set click event for PANEL BUTTON
    $('#cbtn').click(function() {
        $('#Dialog').modal('hide');
    });


    //First remove any click events that may exist
    $('.panelbutton').unbind('click');
    //Then set click event for PANEL BUTTON
    $('.panelbutton').click(function() {
        var tabName = $(this).attr('tabname')
        //console.log(tabName);

        if ($("#" + tabName)[0].clientWidth > 100) {
            $('#main-nav a.close-tab').click();
            return;
        }
        
        $('#main-nav a.close-tab').click();
        $("#" + tabName).show('slide', {
            direction: 'right'
        }, 1000);   
    });

    //First remove any click events that may exist
    $('#main-nav a.close-tab').unbind('click');
    //Then set click event for PANEL CLOSE BUTTON
    $('#main-nav a.close-tab').click(function() {
        $(".aside-content").hide('slide', {
            direction: 'right'
        }, 1000);        
    });
    
    //First remove
    $("#cbx_county_pls").unbind('click');
    //Then set events
    $("#cbx_county_pls").click(function(){
        map._layers.layer1.setVisibility(this.checked);
    });
    
    //First remove
    $("#cbx_management_plans").unbind('click');
    //Then set events
    $("#cbx_management_plans").click(function(){
        map._layers.management_plans.setVisibility(this.checked);
    });
    
    //First remove
    $("#cbx_project_areas").unbind('click');
    //Then set events
    $("#cbx_project_areas").click(function(){
        map._layers.project_areas.setVisibility(this.checked);
    });
    
    //First remove
    $("#cbx_management_plans_sel").unbind('click');
    //Then set events
    $("#cbx_management_plans_sel").click(function(){
        map._layers.graphicsLayer2.setVisibility(this.checked);
    });
}