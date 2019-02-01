// var config = {
//     apiKey: "AIzaSyDwjy8NSU9Lrf25eDNOK7w1ATRuRHcMIbM",
//     authDomain: "train-scheduler-assignme-c1fd7.firebaseapp.com",
//     databaseURL: "https://train-scheduler-assignme-c1fd7.firebaseio.com",
//     projectId: "train-scheduler-assignme-c1fd7",
//     storageBucket: "",
//     messagingSenderId: "931949793399"
// };
// firebase.initializeApp(config);

// var database = firebase.database();

$(".get-music").click(function (event) {
    event.preventDefault();

    // Variable for file path to be uploaded
    // var faceFile = "~/images/test.jpg";
    var faceLink = $("#user-link").val().trim();
    // API Key:
    var apiKey = "fc3rHjH50Us_jhP1zC0V26KkykD96fib";
    // API Secret
    var apiSecret = "xq072ifDu6LeqQf3uOtY0oj6EkxJlGqf";
    // Attribute request
    // Can use none; gender; AGE; smiling; headpose; facequality; + more in API documentation
    var apiAttr = "age";
    // Build URL with key & attribute request
    var facePlusURL = "https://api-us.faceplusplus.com/facepp/v3/detect" + "?api_key=" + apiKey +
        "&api_secret=" + apiSecret + "&image_url=" + faceLink + "&return_attributes=" + apiAttr;

    console.log(facePlusURL);

    // Ajax call here -----------------------------------------------------------------------------------------
    $.ajax({
        url: facePlusURL,
        method: "POST"
    })
        .then(function (response) {
            var ageResponse = response.faces[0].attributes.age.value;
            console.log(ageResponse);
        });

        database.ref().push({
            Age: ageResponse,

        })
});



