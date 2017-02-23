function setEventListeners(){
    //THIS ONE MAY GO TO CUSTOM EVENT LISTENERS ....
    $('#logout').click(function() {
       delete_cookies();
    });
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
}