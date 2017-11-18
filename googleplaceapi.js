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
var paginate = 0;
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
    $('#table').append("<tr><th>Count</th><th>Name</th><th>Rating</th><th>PriceLevel</th><th>URL</th><th>OpenNow</th><th>ID</th></tr>");
    // $('#table').append("<tr><th>Name</th><th>Rating</th><th>Types</th><th>ID</th></tr>");

    //Testing
    var places = searchBox.getPlaces();
    console.log(places[0]);
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

              service.textSearch(request, searchPlaces);
              function searchPlaces(results, status) {     //to get up to 60 places
                      if (status == google.maps.places.PlacesServiceStatus.OK) {
                        processResults(results);
                      }

                //console.log(results);
                // if (status !== google.maps.places.PlacesServiceStatus.OK) {
                //   return;
                // } else {
                //   restaurants.push.apply(restaurants, results);
                //   if (pagination.hasNextPage) {
                //     pagination.nextPage();

                //     console.log(results.length);


                //   }
                //   else {
                //     processResults(restaurants);

                //   }
                //   //pagination scope
                // }  //else of search places scope
                // paginate++;
                // $('#list').append(`<h4> Total delay ${delay} for ${paginate} Pagination</h4>`);
                // console.log(`Total delay ${delay}`);

              }  //searchPLaces  scope
            });

          }

        });


      });
    }


  });  //searchbox listener scope

}

function processResults(restaurants) {
  var count = 1;
  
  $('#list').append(`<h4> Nearest ${restaurants.length} around given address </h4>`);

  for (var i = 0; i < restaurants.length; i++) {
    service.getDetails({
      placeId: restaurants[i].place_id
    }, callback);
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        try {
          // console.log(place)

          $('#table').append("<tr><td>" + count++ + "</td><td>" + place.name + "</td><td>" + place.rating + "</td><td>" + place.price_level + "</td><td>" + place.url + "</td><td>" + place.opening_hours.open_now + "</td><td>" + place.place_id + "</td></tr>");
        }
        catch (e) {

          console.log("Stupid Happened with obj(s) below")
          $('#table').append("<tr><td>" + count++ + "</td><td>" + place.name + "</td><td>" + place.rating + "</td><td>" + place.price_level + "</td><td>" + place.url + "</td><td>Call " + place.international_phone_number + "</td><td>" + place.place_id + "</td></tr>");

          //console.log(place);
          //console.log(e);
        }
        // $('#list').append(place.name + place.rating + place.url + '<br />');
        //console.log(place);

        //Data for all restaurants within input zip is ready //Ready for another level of complexity

      }
      else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
        setTimeout(1000);
        i--;   //redo the index which hits the limit , 1000 milisecond = 1 sec


      }
    }
  }
}



//var item = items[Math.floor(Math.random()*items.length)];

// service.nearbySearch({
//   location: pyrmont,
//   radius: 500,
//   type: ['store']
// }, callback);

