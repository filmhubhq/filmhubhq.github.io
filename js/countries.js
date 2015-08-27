// all this code from http://www.geocodezip.com/v3_FusionTables_MultiCountryBrowser.html
// needs a complete re-write - later...

// globals
var infoWindow = null;
var geoXml = null;
var geoXmlDoc = null;
var myLatLng = null;
var myOptions = null;
var mapCenter = null;
var geocodeTheCountry = true;
var gpolygons = [];
// var geocoder = null;
var countries = ["'Germany'"]; // ["'United States of America'", "'Germany'", "'France'"];

// Fusion Table data ID
var FT_TableID = '1ov8ykzakf3WcwMCIBRsZjzRlOAGvJFsDjN_m9VQ';// 420419;
var CountryName = "";

var FTresponse = null;

myLatLng = new google.maps.LatLng(37.422104808, -122.0838851);
// these set the initial center, zoom and maptype for the map 
// if it is not specified in the query string
var lat = 37.422104808;
var lng = 0.0;
var zoom = 2;
var maptype = google.maps.MapTypeId.ROADMAP;
infoWindow = new google.maps.InfoWindow();

google.load('visualization', '1', {
  'packages': ['corechart', 'table', 'geomap']
});

// function getCountryNames() {
//   // set the query using the parameters
//   var FT_Query_CountryName = "SELECT 'name_0', count() FROM " + FT_TableID + " GROUP by 'name_0' ORDER by 'name_0'";
//   document.getElementById("FTquery4").innerHTML = FT_Query_CountryName;
//   var queryText = encodeURIComponent(FT_Query_CountryName);
//   var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
//
//   //set the callback function
//   query.send(createCountryDropdown);
// }
//
// function createCountryDropdown(response) {
//   if (!response) {
//     alert('no response');
//     return;
//   }
//   if (response.isError()) {
//     alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
//     return;
//   }
//   //for more information on the response object, see the documentation
//   //http://code.google.com/apis/visualization/documentation/reference.html#QueryResponse
//   numRows = response.getDataTable().getNumberOfRows();
//   numCols = response.getDataTable().getNumberOfColumns();
//
//   var countryNames = {};
//   for (var i = 0; i < numRows; i++) {
//     var countryName = response.getDataTable().getValue(i, 0);
//     countryNames[countryName] = countryName;
//   }
//   var countryNameDropdown = "<select multiple name='country_select' id='country_select' onchange='handleSelected(this)'>"
//   countryNameDropdown += '<option selected> - Select a country - <\/option>';
//   for (countryName in countryNames) {
//     countryNameDropdown += "<option value='" + countryName + "'>" + countryName + "</option>"
//     //    document.getElementById('country_list').innerHTML += countryName+"<br>";
//   }
//   countryNameDropdown += "</select>"
//   // document.getElementById('dropdown_menu').innerHTML = countryNameDropdown;
// }
//

// ======= This function handles selections from the select box ====

function handleSelected(opt) {
  checkboxArray = document.getElementById('country_select');
  countries = [];
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected == true) {
      countries.push("'" + checkboxArray[i].value + "'");
    }
  }
  DisplayCountry();
}

//define callback function, this is called when the results are returned

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
  fusiontabledata += "</table>"
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
//
// function DisplayCountry() {
//   var CountriesQuery = countries.join(",");
//   // FT_Query = "SELECT 'kml_4326' FROM " + FT_TableID + " WHERE 'name_0' IN(" + CountriesQuery + ");";
//   // FT_Query = "SELECT 'geometry' FROM " + FT_TableID + " WHERE 'CountryName' IN(" + CountriesQuery + ");";
//
//   gpolygons = [];
//   layer.setQuery(FT_Query);
//   if (!layer.getMap()) layer.setMap(map);
//   console.log(FT_Query);
// }

function countriesInitialize() {

  // If there are any parameters at eh end of the URL, they will be in  location.search
  // looking something like  "?marker=3"

  // skip the first character, we are not interested in the "?"
  // var query = location.search.substring(1);
  //
  // // split the rest at each "&" character to give a list of  "argname=value"  pairs
  // var pairs = query.split("&");
  // for (var i = 0; i < pairs.length; i++) {
  //   // break each pair at the first "=" to obtain the argname and value
  //   var pos = pairs[i].indexOf("=");
  //   var argname = pairs[i].substring(0, pos).toLowerCase();
  //   var value = pairs[i].substring(pos + 1);
  //   if (argname == "country") {
  //     CountryName = unescape(value);
  //   }
  //   if (argname == "countries") {
  //     var countriesStr = unescape(value);
  //     var countriesArray = countriesStr.split(",");
  //     countries = [];
  //     for (var j = 0; j < countriesArray.length; j++) {
  //       countries.push("'" + countriesArray[j] + "'");
  //     }
  //     //           alert("1:"+countries.length);
  //   }
    
  // value = pairs[i].substring(pos + 1).toLowerCase();

  // google.maps.event.addListener(map, "click", function(event) {
  //   infoWindow.close();
  //   var FT_click_query = "SELECT 'name_0' FROM " + FT_TableID + " WHERE ST_INTERSECTS('kml_4326',CIRCLE(LATLNG" + event.latLng + ", 1));";
  //   var queryText = encodeURIComponent(FT_click_query);
  //   var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
  //   document.getElementById("FTquery5").innerHTML = FT_click_query;
  //
  //   //set the callback function
  //   query.send(getCountryFromClick);
  // });
  //

  // geocoder = new google.maps.Geocoder();

  var map = new google.maps.Map(document.getElementById("map_canvas"), {
    zoom: 2,
    center: {lat: 37.4658276, lng: -38.6539022},
  });
  

  var iso2List = ["'US'", "'CN'", "'IN'", "'UK'", "'DE'", "'JP'", "'AU'", "'NZ'", "'ES'", "'FR'", "'RU'", "'DN'", "'GR'", "'NO'"]; // wrap in single quotes
  var whereClause = "'Iso2CodeCountry' IN (" + iso2List.join(',') + ")";
  console.log(whereClause);

  var layer = new google.maps.FusionTablesLayer({
      query: {
        select: 'geometry',
        from: '1ov8ykzakf3WcwMCIBRsZjzRlOAGvJFsDjN_m9VQ',
        where: whereClause
      }
      // suppressInfoWindows: true
    });
    
  layer.setMap(map);

  // google.maps.event.addListener(layer, "click", function(event) {
  //   infoWindow.close();
  //   infoWindow.setContent(infoWindowContent(event.row.name_0.value));
  //   infoWindow.setPosition(event.latLng);
  //   infoWindow.open(map);
  // });
  //
  // if (countries.length > 0) DisplayCountry();
}

$(function() {
  countriesInitialize();
});
