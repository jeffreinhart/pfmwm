function setEventListeners(){
    //THIS ONE MAY GO TO CUSTOM EVENT LISTENERS ....
    $('#logout').click(function() {
       delete_cookies();
       window.location = 'index.html';
    });
    
    $('#backButton').click(function(){
        window.location = 'main.html';
    });
    
    $('#planDetailsButton').click(function(){
        goStewPlanDetails();
    });
    
    $('#lcDetailsButton').click(function(){
        goLcDetails();
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
}