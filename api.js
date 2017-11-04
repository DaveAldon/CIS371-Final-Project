/*
API Logic

Call to Yelp with three parameters
Budget ($, $$, $$$), ZIP, Optional Food Genre
Parse Response
*/

const apiID = "jUv7Kj68ZHWx89jz_XYl4A";
const apiKey = "FmnbNwpbWB0qea1BtvUWV0NUDYR6KEPsDifSDMJ3dBdjra1xeBvssPJLB0I6oKmg";
const apiToken = "oE7XxWIgeCKpvcpLOGX9BAK-OIkWWr9U_hY0KFs9y0yvnoQMtBBu9sJPtleQS3HJ1ktqSiQBQb4RnGyNqhyhne0z5PbcR14Hh1YUSInpmz_ngFKwEy_PLJngeXb8WXYx";
const apiRoot = "https://api.yelp.com";
//const apiToken = "/oauth2/token";
const grantType = "client_credentials";
const Searchapi = '/v3/businesses/search?';

var zip = '49504';

function getFoodwithZip(){
    

$.ajax({
    url: `${apiRoot}${Searchapi}location=${zip}`,
    type: 'post',
    data: {
            grant_type: grantType,
            client_id: apiID,
            client_secret: apiKey
    },
    headers: {
        Authorization: 'Bearer ' + apiToken
    },
    dataType: 'jsonp',
    success: function (data) {
        console.info(data);
    },
    error: function () {
        //console.log(apiToken);
                console.log("failed");
            }
});
    // $.ajax({
    //     url: `${apiRoot}${Searchapi}location=${zip}`,
    //      type: "POST",             
    //     crossDomain: true,
    //     async: true, 
        
    //      data: {
    //         grant_type: grantType,
    //         client_id: apiID,
    //         client_secret: apiKey
    //     },           
    //     processData: false,
    //     headers: {
    //         Authorization: `Bearer ${apiToken}`
    //     },
    //     dataType: "jsonp",
    //     success: function (data) {                  
    //         console.log(data);
    //           },
    //     error: function () {
    //         console.log("failed");
    //     }
    // });

}

getFoodwithZip();

//https://api.yelp.com/v3/businesses/search?term=restaurant&location=boulder&Authorization=Bearer [YOUR ACCESS TOKEN]
