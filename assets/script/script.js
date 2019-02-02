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

// Image address: https://www.lifelinkiii.com/wp-content/uploads/2018/10/Matt_Smiles.jpg

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
    var apiAttr = "age,gender";
    // Build URL with key & attribute request
    var facePlusURL = "https://api-us.faceplusplus.com/facepp/v3/detect" + "?api_key=" + apiKey +
        "&api_secret=" + apiSecret + "&image_url=" + faceLink + "&return_attributes=" + apiAttr;

    console.log(facePlusURL);
    console.log(userName);
    localStorage.setItem("userName", userName);
    localStorage.setItem("imgLink", faceLink);

    // Ajax call here -----------------------------------------------------------------------------------------
    $.ajax({
        url: facePlusURL,
        method: "POST"
    })
        .then(function (response) {
            var ageResponse = response.faces[0].attributes.age.value;
            var genderResponse = response.faces[0].attributes.gender.value;
            console.log(ageResponse);
            console.log(genderResponse);
            database.ref().push({
                Name: userName,
                Age: ageResponse,
                gender: genderResponse,
                link: faceLink,
            });
      
            localStorage.setItem("API-age", ageResponse);
            under18();

            //Modal function - Under 18
            function under18() {
                if (ageResponse <= 18) {
                    $('#underageModal').modal('show');
                }
            };
      
            var currentYear = new Date().getFullYear();
            var eighteenYear = currentYear - ageResponse + 18
            localStorage.setItem("ageResponse", ageResponse);
            localStorage.setItem("eighteenYear", eighteenYear)
            location.assign("results.html");
        });

})

// Results page script here

// Write username to page from local storage
$("#userName").text(localStorage.userName);

// Write image file to page from local storage
$(".user-picture").replaceWith("<img id='newPic' src=" + localStorage.imgLink + ">");

//only 1995 from now on
//create variables holding the top 10 songs
var song1 = {
    track: "Gangsta's Paradise",
    artist: "Coolio featuring L.V.",
    album_url: "../images/Gangsta's-Paradise.jpg",
    track_url: "https://www.youtube.com/watch?v=fPO76Jlnz6c"
};

var song2 = {
    track: "Waterfalls",
    artist: "TLC",
    album_url: "../images/Crazy-Sexy-Cool.png",
    track_url: "https://www.youtube.com/watch?v=8WEtxJ4-sh4"
};

var song3 = {
    track: "Creep",
    artist: "TLC",
    album_url: "../images/Crazy-Sexy-Cool.png",
    track_url: "https://www.youtube.com/watch?v=LlZydtG3xqI"
};

var song4 = {
    track: "Kiss from a Rose",
    artist: "Seal",
    album_url: "../images/Kiss-From-A-Rose.jpg",
    track_url: "https://www.youtube.com/watch?v=AMD2TwRvuoU"
};

var song5 = {
    track: "On Bended Knee",
    artist: "Boyz II Men",
    album_url: "../images/On-Bended_knee.jpg",
    track_url: "https://www.youtube.com/watch?v=jSUSFow70no"
};

var song6 = {
    track: "Another Night",
    artist: "Real McCoy",
    album_url: "../images/Another-Night.jpg",
    track_url: "https://www.youtube.com/watch?v=Pav2f4b-1ZE"
};

var song7 = {
    track: "Fantasy",
    artist: "Mariah Carey",
    album_url: "../images/Fantasy.png",
    track_url: "https://www.youtube.com/watch?v=qq09UkPRdFY"
};

var song8 = {
    track: "Take a Bow",
    artist: "Madonna",
    album_url: "../images/Take-a-Bow-Madonna.png",
    track_url: "https://www.youtube.com/watch?v=XDeiovnCv1o"
};

var song9 = {
    track: "Don't Take It Personal (Just One of Dem Days)",
    artist: "Monica",
    album_url: "../images/Don't-Take-It-Personal-(Just-One-of-Dem-Days).jpg",
    track_url: "https://www.youtube.com/watch?v=asXau88O5Is"
};

var song10 = {
    track: "This Is How We Do It",
    artist: "Montell Jordan",
    album_url: "../images/This-is-how-we-do-it.png",
    track_url: "https://www.youtube.com/watch?v=0hiUuL5uTKc"
};

//set the database to include the songs
database.ref().set({
    song1: song1,
    song2: song2,
    song3: song3,
    song4: song4,
    song5: song5,
    song6: song6,
    song7: song7,
    song8: song8,
    song9: song9,
    song10: song10
});