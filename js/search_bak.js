var results="";
var geoResults;



function search_gazetteer() {

    $.ajaxPrefilter( function( options ) {
        options.url = "https://services.dnr.state.mn.us/api/gazetteer/v1";
    }); 

   // console.log("search_gazetteer=(" + $('#txtSearch').val() + ")");
    $('#txtSearch').focus();
    $.ajax({
        url: "https://services.dnr.state.mn.us/api/gazetteer/v1",
        type: "POST",
        data: {
            "limit": '5000',
            "name": $('#txtSearch').val(),
            "callback": 'getSearchResults'
        },
        dataType: 'jsonp'
    })
    .done(function(data) {
        getSearchResults(data);              
    })
    .fail(function(xhr, txt, err) {
        //alert('Service failed in gazetteer...' + xhr + txt + err);
    })
}

function getSearchResults(data) {
   
    if (data.status != "OK")
        alert(data.message);
    else {
        var content = "<thead><tr><th>Name</th><th>County</th><th>Type</th></tr></thead>";
      
        for (var i=0; i<data.results.length; i++) {
            
            name = data.results[i].name;
            county = data.results[i].county;
            id = data.results[i].id;
            type = data.results[i].type;
            content += "<tr  class='clickable-row' data-id='"+i+"'><td>" + name + "</td>" +"<td>" + county + "</td>"+ "<td>" +type + "</td></tr>";           
        }

        $("#acont").hide('slide', {
                    direction: 'up'
                }, 100);
        
        $("#scont").show('slide', {
                direction: 'up'
            }, 500);

        $('#lucky_information').html(content);
        
        $('.clickable-row').click(function() {
           var dt =  $(this).data('id');
           
            selectSearchResult(dt, data);
        });
    }
}

function selectSearchResult(rowData, data) {
    var theSelectedIndex = rowData;        
    var epsg4326 = data.results[theSelectedIndex].bbox["epsg:4326"];
    
    var pointMinXY = new esri.geometry.Point({latitude: epsg4326[1], longitude: epsg4326[0]});
    var pointMinXYWebMercator = esri.geometry.geographicToWebMercator(pointMinXY);
    var pointMaxXY = new esri.geometry.Point({latitude: epsg4326[3], longitude: epsg4326[2]});
    var pointMaxXYWebMercator = esri.geometry.geographicToWebMercator(pointMaxXY);
    extent = new esri.geometry.Extent(pointMinXYWebMercator.x, pointMinXYWebMercator.y, pointMaxXYWebMercator.x, pointMaxXYWebMercator.y, new esri.SpatialReference({ wkid:102100 }));
    map.setExtent(extent);
}

function plsInputValidate() {
    twpVal = parseInt($('#txtSearchTwp').val());
    if ((twpVal < 26) || ((twpVal > 71) && (twpVal < 101)) || (twpVal > 168))
    {
        alert("Valid Township values are 26-71 or 101-168 not " + twpVal);
        return false;
    }

    rngVal = parseInt($('#txtSearchRng').val());
    if ((rngVal < 1) || (rngVal > 51))
    {
        alert("Valid Range values are 1-51 not " + rngVal);
        return false;
    }

    if ($('#txtSearchSec').val().trim() != '')
    {
        secVal = parseInt($('#txtSearchSec').val());
        if ((secVal < 1) || (secVal > 36))
        {
            alert("Valid Section values are 1-36 not " + secVal);
            return false;
        }
    }
    return true;
}

function search_PLS() {
    // alert("search_PLS");
    $('#txtSearchTwp').focus();
    theDir = 0;
    if (document.getElementById("radioDirEast").checked) theDir = 1;
    if ($('#txtSearchSec').val() != '') inputParamenters = {"f": "pjson", "Twp": $('#txtSearchTwp').val(), "Rng": $('#txtSearchRng').val(), "Dir": theDir, "Sec": $('#txtSearchSec').val()};
        else inputParamenters = {"f": "pjson", "Twp": $('#txtSearchTwp').val(), "Rng": $('#txtSearchRng').val(), "Dir": theDir};

    $.ajaxPrefilter( function( options ) {
        options.url = "https://arcgis.dnr.state.mn.us/gis/lv_where_service/where.py";
    }); 

    $.ajax({
        url: "https://arcgis.dnr.state.mn.us/gis/lv_where_service/where.py",
        type: "POST",
        data: inputParamenters,
        dataType: 'json'        
    })

    .done(function(data) {
        console.log(data);
        if (data['UtmX'] < 0)
            alert(data['Message']);
        else {
            console.log(data);
            var point = new esri.geometry.Point({latitude: data['results']['latlong']['dd']['lat'], longitude: data['results']['latlong']['dd']['lon']});
            console.log(point);
            var pointWebMercator = esri.geometry.geographicToWebMercator(point);

            console.log(data['results']['pls']['geom']);
            var polygon = new esri.geometry.Polygon(data['results']['pls']['geom']);    
            polygon.setSpatialReference(new esri.SpatialReference({wkid : 26915 }));
            var outSR = new esri.SpatialReference({ wkid : 102100 });
            var gsvc = new esri.tasks.GeometryService("https://arcgis.dnr.state.mn.us/mndnr/rest/services/Utilities/Geometry/GeometryServer");

            gsvc.project([polygon], outSR, function (outGeom) { 
                console.log(outGeom[0]);
                locationGraphic = new esri.Graphic(outGeom[0],highlightPolyGraphic);
                map.graphics.clear();
                map.graphics.add(locationGraphic);
                console.log(locationGraphic);
                if ($('#txtSearchSec').val().trim() != '') map.centerAndZoom(pointWebMercator,15);
                    else map.centerAndZoom(pointWebMercator,12);
            })
        }
    })
    .fail(function(xhr, txt, err) {
      alert('Service failed in myClickHandler...' + xhr + txt + err);
    });
}

function search_Bing() {
    $('#txtSearchAddress').focus();
    var key = "Amk1WYDKY5Xs8SZQmvouwFi2mFxmhO6ajgipol1Ni7oeTiJJI0inMbsiBuHyy1Nl";
    var veGeocoder;

    veGeocoder = new esri.virtualearth.VEGeocoder({
                                bingMapsKey:key
    });

    dojo.connect(veGeocoder, "onAddressToLocationsComplete", function(geocodeResults) {
                  
        geoResults = geocodeResults;
      
        if (geocodeResults.length > 0) {
             $("#acont").show('slide', {
                direction: 'up'
            }, 500);
            $("#scont").hide('slide', {
                direction: 'up'
            }, 100);
           
             $("#findTable tr").remove(); 
             dojo.forEach(geocodeResults, function(geocodeResult, index) {
                     $('#findTable').append('<tr><td id='+ index + '>' + geocodeResult.displayName + '</td></tr>');
                 // $(rowBuilder(geocodeResult)).data("displayName",geocodeResult).appendTo("#findTable");
              });
             var tr = $('#findTable').find('tr');
             tr.bind('click', function(event) {
                    var values = '';
                    tr.removeClass('row-highlight');
                    var tds = $(this).addClass('row-highlight').find('td');
                    $.each(tds, function(index, item) {
                        loc =  item.id;
                      
                    });
                                    
                    zoomAddress(loc);
              });
           

    $('#lucky_information').html(content);  
        } 
    });

                
    var str = $('#txtSearchAddress').val();

    if (str.indexOf(',') == -1) {
        var query = str+ ", MN";
    }
    else{
        var query = str;
    }

    veGeocoder.addressToLocations(query);                                
}

function zoomAddress(i){
    var pointMeters = esri.geometry.geographicToWebMercator(geoResults[i].location);
    var pointSymbol = new esri.symbol.PictureMarkerSymbol('./assets/img/poi_search.png', 25, 39);
    locationGraphic = new esri.Graphic(pointMeters,pointSymbol);
    map.graphics.add(locationGraphic);
    map.centerAndZoom(locationGraphic.geometry,18);  
}

function search_Coordinates() {
    $('#txtSearchCoordinates').focus();
    inputParamenters = {"f": "pjson", "PointText": $('#txtSearchCoordinates').val()};
    $.ajax({
        url: "https://arcgis.dnr.state.mn.us/gis/lv_where_service/where.py",
        type: "POST",
        data: inputParamenters,
        dataType: 'json'        
    })

    .done(function(data) {
        // console.log(data);
        if (data['UtmX'] < 0)
            alert(data['Message']);
        else { 
            tF = 2000;
            var theLat = data['results']['latlong']['dd']['lat'];
            var theLon = data['results']['latlong']['dd']['lon'];

            var point = new esri.geometry.Point({latitude: theLat, longitude: theLon});
            var pointWebMercator = esri.geometry.geographicToWebMercator(point);

            // console.log(point);
            var pointSymbol = new esri.symbol.PictureMarkerSymbol('./assets/img/poi_search.png', 25, 39);
            locationGraphic = new esri.Graphic(pointWebMercator,pointSymbol);
            map.graphics.clear();
            map.graphics.add(locationGraphic);
            // console.log(locationGraphic);
            map.centerAndZoom(pointWebMercator,12);
        }
    })
    .fail(function(xhr, txt, err) {
        // alert('Point Not in Minnesota');
      // alert('Service failed in myClickHandler...' + xhr + txt + err);
    });    
}