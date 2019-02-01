var config = {
    apiKey: "AIzaSyDlzR-M7KYpIXtNC9Lk-CfHo8vBpLc_XZA",
    authDomain: "grp-project.firebaseapp.com",
    databaseURL: "https://grp-project.firebaseio.com",
    projectId: "grp-project",
    storageBucket: "grp-project.appspot.com",
    messagingSenderId: "751791086273"
};
firebase.initializeApp(config);

var database = firebase.database();

$(".get-music").click(function (event) {
    event.preventDefault();

    // User's name
    var userName = $("#user-name").val().trim();
    // URL for link to user's photo
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
    console.log(userName);

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
        Name: userName,
        Age: ageResponse,

    })
});



