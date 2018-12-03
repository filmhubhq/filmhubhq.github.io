// based on http://www.geocodezip.com/v3_FusionTables_MultiCountryBrowser.html
// needs a complete re-write - later...

// globals
var infoWindow = null;
var myLatLng = null;
var myOptions = null;
var mapCenter = null;
var geocodeTheCountry = true;
var gpolygons = [];
var countries = ["'Germany'"]; // ["'United States of America'", "'Germany'", "'France'"];

// Fusion Table data ID
var FT_TableID = '1ov8ykzakf3WcwMCIBRsZjzRlOAGvJFsDjN_m9VQ';// 420419;
var CountryName = "";

var FTresponse = null;

infoWindow = new google.maps.InfoWindow();

google.load('visualization', '1', {
  'packages': ['corechart', 'table', 'geomap']
});

function countriesInitialize() {
  var map = new google.maps.Map(document.getElementById("map_canvas"), {
    zoom: 2,
    center: {lat: 37.4658276, lng: -38.6539022},
  });
  // wrap in single quotes
  var iso2List = ["'US'", "'CN'", "'IN'", "'UK'", "'DE'", "'JP'", "'AU'", "'NZ'",
                  "'ES'", "'FR'", "'RU'", "'DN'", "'GR'", "'NO'", "'MY'",
                  "'BR'", "'IT'"];
  var whereClause = "'Iso2CodeCountry' IN (" + iso2List.join(',') + ")";
  var layer = new google.maps.FusionTablesLayer({
      query: {
        select: 'geometry',
        from: '1ov8ykzakf3WcwMCIBRsZjzRlOAGvJFsDjN_m9VQ',
        where: whereClause,
      },
      // suppressInfoWindows: true
    });
  layer.setMap(map);
  // google.maps.event.addListener(layer, "click", function(event) {
  //   console.log(event);
    // infoWindow.close();
    // infoWindow.setContent(infoWindowContent(event.row.name_0.value));
    // infoWindow.setPosition(event.latLng);
    // infoWindow.open(map);
  // });

}

// define callback function, this is called when the results are returned
function getData(response) {
  if (!response) {
    alert('no response');
    return;
  }
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  FTresponse = response;
  //for more information on the response object, see the documentation
  //http://code.google.com/apis/visualization/documentation/reference.html#QueryResponse
  numRows = response.getDataTable().getNumberOfRows();
  numCols = response.getDataTable().getNumberOfColumns();
  if (numRows <= 1) {
    document.getElementById('sidebar').innerHTML = "no data";
    return;
  }

  //concatenate the results into a string, you can build a table here
  fusiontabledata = "<table><tr>";
  //  for(i = 0; i < numCols; i++) {
  fusiontabledata += "<th colspan='2'>" + response.getDataTable().getValue(1, 0) + "</th>";
  //   }
  fusiontabledata += "</tr><tr>";
  fusiontabledata += "<tr><td colspan='2' align='left'><a href='javascript:showAll();'>show all</a></td></tr>";
  for (i = 0; i < numRows; i++) {
    //    for(j = 0; j < numCols; j++) {
    /*
   var kml =  response.getDataTable().getValue(i,2);
   geoXml.parseKmlString("<Placemark>"+kml+"</Placemark>");
   */
    fusiontabledata += "<td><a href='javascript:myFTclick(" + i + ")'>" + response.getDataTable().getValue(i, 1) + "</a></td><td><a href='javascript:zoomTo(" + i + ")'>show</a></td>";
    //    }
    fusiontabledata += "</tr><tr>";
  }
  fusiontabledata += "</table>";
  //display the results on the page
  document.getElementById('sidebar').innerHTML = fusiontabledata;
}

function infoWindowContent(countryName, id) {
  content = '<div class="FT_infowindow">' + countryName;
  if (typeof id != "undefined") {
    content += '<a href="javascript:zoomTo(' + id + ');">zoom to</a>';
  }
  content += '</div>';
  return content;
}

function myFTclick(row) {
  var countryName = FTresponse.getDataTable().getValue(row, 0);
  // var name = FTresponse.getDataTable().getValue(row, 1);
  loadRow(row);
  var position = gpolygons[row].position;
  // Set up and create the infowindow
  if (!infoWindow) infoWindow = new google.maps.InfoWindow({});
  infoWindow.setOptions({
    content: infoWindowContent(countryName, row),
    pixelOffset: new google.maps.Size(0, 2),
    position: position
  });
  // Infowindow-opening event handler
  infoWindow.open(map);
}

function getCountryFromClick(response) {
  if (!response) {
    alert('no response');
    return;
  }
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  //for more information on the response object, see the documentation
  //http://code.google.com/apis/visualization/documentation/reference.html#QueryResponse
  numRows = response.getDataTable().getNumberOfRows();
  numCols = response.getDataTable().getNumberOfColumns();
  if (numRows <= 1) {
    return;
  }
  CountryName = response.getDataTable().getValue(1, 0);
  // alert("CountryName="+CountryName);
  DisplayCountry();

}


$(function() {
  countriesInitialize();
});
