class SplashScreen {
    constructor() {

    }

    get_Dialog() {
        return "<div class='modal fade' tabindex='-1' role='dialog' id='Dialog' data-backdrop='static' data-keyboard='false'>" +
            "<div class='modal-dialog'>" +
                "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                    "</div>" +
                    "<div id='scrollable' class='modal-body'>" +
                        "<h1>Title of Application</h1>" +
                        "<p><b>General Disclaimer:</b></br>" +
                            "<div class='dont-break-out'>" +
                            "<p>Application Description / Disclaimer goes here</p>" +
                            "</div>" +
                        "</p>" +
                    "</div>" +
                    "<div class='modal-footer'>" +
                        "<button id='cbtn' type='button' class='btn'>Continue</button>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>";
    }
}
