/*
API Logic

Call to Yelp with three parameters
Budget ($, $$, $$$), ZIP, Optional Food Genre
Parse Response
*/

const apiID = "jUv7Kj68ZHWx89jz_XYl4A";
const apiKey = "FmnbNwpbWB0qea1BtvUWV0NUDYR6KEPsDifSDMJ3dBdjra1xeBvssPJLB0I6oKmg";

const apiRoot = "https://api.yelp.com";
const apiToken = "/oauth2/token";
const grantType = "client_credentials";
const Searchapi = '/v3/businesses/search?';

zip = '49504';

function getFoodwithZip(zip){
    $.ajax(`${apiRoot}${apiToken}`, {
        type: "POST",
        crossDomain: true,
         data: {
            grant_type: grantType,
            client_id: apiID,
            client_secret: apiKey
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer $token")

        },
        complete: function(response){ console.log(response);}
        });
		
//         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',      
//           dataType: "json",
//         success: function (data) {
//             console.log(data);
    
//         },
//         error: function () {
//             console.log("post call error");
//         }
    
    
//     })
}

getFoodwithZip(zip);