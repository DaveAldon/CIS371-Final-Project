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

var zip = '49504';

function getFoodwithZip(){
    
    $.ajax({
        url: `${apiRoot}${apiToken}`,
         method: "POST",             
        crossDomain: true,
        async: true,        
         data: {
            grant_type: grantType,
            client_id: apiID,
            client_secret: apiKey
        },           
        contentType: "application/x-www-form-urlencoded",
        dataType: "jsonp",
        success: function (data) {                  
            console.log(data);
              },
        error: function () {
            console.log("failed");
        }
    });

}

getFoodwithZip();