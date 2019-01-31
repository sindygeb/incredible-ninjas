// Click or other function to intitiate Ajax call to Face++ 
// INSIDE that function initiate AJAX call with file
//--------------------------------------------------------------------------------------
$(document).ready(function () {
    console.log("lets-a-go");
});

$("#submit").click(function () {

    // Variable for file path to be uploaded
    var faceFile = "~/images/test.jpg";
    // var faceFile = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Judi_Dench_at_the_BAFTAs_2007.jpg/330px-Judi_Dench_at_the_BAFTAs_2007.jpg";
    // API Key:
    var apiKey = "fc3rHjH50Us_jhP1zC0V26KkykD96fib";
    // API Secret
    var apiSecret = "xq072ifDu6LeqQf3uOtY0oj6EkxJlGqf";
    // Attribute request
    // Can use none; gender; AGE; smiling; headpose; facequality; + more in API documentation
    var apiAttr = "age";
    // Build URL with key & attribute request
    var facePlusURL = "https://api-us.faceplusplus.com/facepp/v3/detect" + "?api_key=" + apiKey +
        "&api_secret=" + apiSecret + "&image_file=" + faceFile + "&return_attributes=" + apiAttr;

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

})