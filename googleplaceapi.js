/*
API Logic

Call to Google Place with three parameters
Budget ($, $$, $$$), ZIP, Optional Food Genre
Parse Response
*/


var service;
var infowindow;
var geocoder;
var request;
var detailRequest;
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
     $('#table').append("<tr><th>Name</th><th>Rating</th><th>URL</th><th>OpenNow</th><th>ID</th></tr>");
     
     //Testing
    var places = searchBox.getPlaces();
    console.log(places[0].name);
    if (places.length > 0) {
      places.forEach(function (place) {

        geocoder.geocode({ 'address': place.name }, function (results, status) {
          //console.log(status);
          if (status === 'OK') {
            results.forEach(function (result) {
              console.log(result.geometry.location.lat() + result.geometry.location.lng());
            
               request = {
                location: new google.maps.LatLng(result.geometry.location.lat(), result.geometry.location.lng()),
                radius: '500',
                query: 'restaurant'
              };    
               service.textSearch(request, callback);
               function callback(results, status) {
                 console.log(results.length);
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  for (var i = 0; i < results.length; i++) {
                    
                     detailRequest = {
                      placeId: results[i].place_id
                    };
                    
                    //$('#list').append(results[i].name +  '<br />');
                    service.getDetails(detailRequest, callback);
                    function callback(place, status) {
                                             console.log(place);

                      if (status == google.maps.places.PlacesServiceStatus.OK) {
                                             
              $('#table').append("<tr><td>"+place.name+"</td><td>"+place.rating+"</td><td>"+place.url+"</td><td>"+place.opening_hours.open_now+"</td><td>"+place.id+"</td></tr>");
                        // $('#list').append(place.name + place.rating + place.url + '<br />');
                        //console.log(place);

                        //Data for all restaurants within input zip is ready //Ready for another level of complexity

                        }
                       
                    }
                   
                  }
                }
              }
            });
                 
          }
        
        });

      });
    }

 
    // places[0].nearbySearch(request, callback);

    // function callback(results, status) {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //       console.log(results[i]);
    //     }
    //   }
    // }




    // Clear out the old markers.

    // For each place, get the icon, name and location.


  });
}

