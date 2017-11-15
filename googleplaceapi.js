/*
API Logic

Call to Google Place with three parameters
Budget ($, $$, $$$), ZIP, Optional Food Genre
Parse Response
*/


var service;
var geocoder;
var request;
var detailRequest;
var delay = 0;
var paginate=0;
//let map = new google.maps.Map(document.createElement('div'));



function initAutocomplete() {
  service = new google.maps.places.PlacesService(document.createElement('div'));
  geocoder = new google.maps.Geocoder;
  //console.log(map);

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  //map.controls.push(input);

  // Bias the SearchBox results towards current map's viewport.



  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
    $("#list").empty();
    $('#table > tr').remove();
    $('#table').append("<tr><th>Name</th><th>Rating</th><th>PriceLevel</th><th>URL</th><th>OpenNow</th><th>ID</th></tr>");
    // $('#table').append("<tr><th>Name</th><th>Rating</th><th>Types</th><th>ID</th></tr>");

    //Testing
    var places = searchBox.getPlaces();
    console.log(places[0].name);
    if (places.length > 0) {
      places.forEach(function (place) {

        geocoder.geocode({ 'address': place.name }, function (results, status) {
          //console.log(status);
          if (status === 'OK') {
            results.forEach(function (result) {
              console.log(result.geometry.location.lat() + "/" + result.geometry.location.lng());

              request = {
                location: new google.maps.LatLng(result.geometry.location.lat(), result.geometry.location.lng()),
                radius: '500',
                query: 'restaurant',                
                minPriceLevel: 0,
                maxPriceLevel: 4
              };
              service.textSearch(request, processResults);
              // function callback(results, status) {                         //only return 20
              // if (status == google.maps.places.PlacesServiceStatus.OK) {

              function processResults(results, status, pagination) {     //to get up to 60 places
                console.log(results);
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                  return;
                } else {
                  if (pagination.hasNextPage) {


                    console.log(results.length);
                    //$('#list').append(`<h4> Nearest ${results.length} around given address </h4>`);


                    for (var i = 0; i < results.length; i++) {
                      //console.log(results[i]);
                      //var place = results[i];
                      //$('#table').append("<tr><td>"+place.name+"</td><td>"+place.rating+"</td><td>"+place.types+"</td><td>"+place.id+"</td></tr>");

                      detailRequest = {
                        placeId: results[i].place_id
                      };

                      //$('#list').append(results[i].name +  '<br />');
                      service.getDetails(detailRequest, callback);
                      function callback(place, status) {
                        //  console.log(place);
                        // console.log(place.price_level);

                        //console.log(status);

                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                          try {
                            $('#table').append("<tr><td>" + place.name + "</td><td>" + place.rating + "</td><td>" + place.price_level + "</td><td>" + place.url + "</td><td>" + place.opening_hours.open_now + "</td><td>" + place.id + "</td></tr>");
                          }
                          catch (e) {

                            console.log("Stupid Happened with obj(s) below")
                            $('#table').append("<tr><td>" + place.name + "</td><td>" + place.rating + "</td><td>" + place.price_level + "</td><td>" + place.url + "</td><td>Call " + place.international_phone_number + "</td><td>" + place.id + "</td></tr>");

                            console.log(place);
                            //console.log(e);
                          }
                          // $('#list').append(place.name + place.rating + place.url + '<br />');
                          //console.log(place);

                          //Data for all restaurants within input zip is ready //Ready for another level of complexity

                        }
                        else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
                          setTimeout(i = delayCount(i), 100);   //redo the index which hits the limit , 1000 milisecond = 1 sec


                          console.log("Hit Limit Inner ∴ add 1s delay");
                        }

                      }

                    }
                    pagination.nextPage();
                  }  //pagination scope
                }  //else of processREsults scope
                paginate++;
                $('#list').append(`<h4> Total delay ${delay} for ${paginate} Pagination</h4>`);
                console.log(`Total delay ${delay}`);
              }  //processResults  scope
            
            });

          }

        });
        
      });
    }
  
  });  //searchbox listener scope
 

}

function delayCount(i) {
  i--;
  delay+=0.1;
  return i;
}

// service.nearbySearch({
//   location: pyrmont,
//   radius: 500,
//   type: ['store']
// }, callback);

