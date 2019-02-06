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

var userName = "";

// Image address: https://www.lifelinkiii.com/wp-content/uploads/2018/10/Matt_Smiles.jpg

$(".get-music").click(function (event) {

    event.preventDefault();

    // User's name
    userName = $("#user-name").val().trim();
    // URL for link to user's photo

    if (userName !== "") {

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

        // console.log(facePlusURL);
        // console.log(userName);
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
                // console.log(ageResponse);
                // console.log(genderResponse);
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
                    } else {
                        location.assign("results.html");
                    }
                };

                var currentYear = new Date().getFullYear();
                var eighteenYear = currentYear - ageResponse + 18
                localStorage.setItem("ageResponse", ageResponse);
                localStorage.setItem("eighteenYear", eighteenYear)
            });

            $.ajaxSetup({
                error: function() {
                    $('#linkModal').modal('show');
                }
            })
    }
    else {
        $("#imageModal").modal("show");
    };
});

// Results page script here

// Write username to page from local storage
$("#userName").text(localStorage.userName);

// Write age to page from local storage
$("#userAge").text(localStorage.ageResponse);

// Write 'year you were 18' to results
$("#eighteenYear").text(localStorage.eighteenYear + "!");

// Write image file to page from local storage
$(".user-picture").replaceWith("<img id='newPic' src=" + localStorage.imgLink + ">");



//only 1995 from now on
//create variables holding the top 10 songs
var song1 = {
    track: "Gangsta's Paradise",
    artist: "Coolio featuring L.V.",
    album_url: "../incredible-ninjas/assets/images/Gangsta's-Paradise.jpg",
    track_url: "https://www.youtube.com/watch?v=fPO76Jlnz6c"
};

var song2 = {
    track: "Waterfalls",
    artist: "TLC",
    album_url: "../incredible-ninjas/assets/images/Crazy-Sexy-Cool.png",
    track_url: "https://www.youtube.com/watch?v=8WEtxJ4-sh4"
};

var song3 = {
    track: "Creep",
    artist: "TLC",
    album_url: "../incredible-ninjas/assets/images/Crazy-Sexy-Cool.png",
    track_url: "https://www.youtube.com/watch?v=LlZydtG3xqI"
};

var song4 = {
    track: "Kiss from a Rose",
    artist: "Seal",
    album_url: "../incredible-ninjas/assets/images/Kiss-From-A-Rose.jpg",
    track_url: "https://www.youtube.com/watch?v=AMD2TwRvuoU"
};

var song5 = {
    track: "On Bended Knee",
    artist: "Boyz II Men",
    album_url: "../incredible-ninjas/assets/images/On-Bended-Knee.jpg",
    track_url: "https://www.youtube.com/watch?v=jSUSFow70no"
};

var song6 = {
    track: "Another Night",
    artist: "Real McCoy",
    album_url: "../incredible-ninjas/assets/images/Another-Night.jpg",
    track_url: "https://www.youtube.com/watch?v=Pav2f4b-1ZE"
};

var song7 = {
    track: "Fantasy",
    artist: "Mariah Carey",
    album_url: "../incredible-ninjas/assets/images/Fantasy.png",
    track_url: "https://www.youtube.com/watch?v=qq09UkPRdFY"
};

var song8 = {
    track: "Take a Bow",
    artist: "Madonna",
    album_url: "../incredible-ninjas/assets/images/Take-a-Bow-Madonna.png",
    track_url: "https://www.youtube.com/watch?v=XDeiovnCv1o"
};

var song9 = {
    track: "Don't Take It Personal (Just One of Dem Days)",
    artist: "Monica",
    album_url: "../incredible-ninjas/assets/images/Don't-Take-It-Personal-(Just-One-of-Dem-Days).jpg",
    track_url: "https://www.youtube.com/watch?v=asXau88O5Is"
};

var song10 = {
    track: "This Is How We Do It",
    artist: "Montell Jordan",
    album_url: "../incredible-ninjas/assets/images/This-is-how-we-do-it.png",
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

//array to store the songs after retrieving them from firebase
var songs = [];

//loop that accesses all of the firebase key objects and stores them in our songs array
for (i = 1; i <= 10; i += 1) {
    firebase.database().ref("song" + i).on("value", function (snapshot) {
        var song = snapshot.val();
        songs.push(song);
    });
};
//loop through the array and update the pages html !!!!! make sure to append these results !!!!!

$(document).ready(function () {
    for (i = 9; i > -1; i -= 1) {
        var track = songs[i].track
        var artist = songs[i].artist
        var trackUrl = songs[i].track_url
        var imageUrl = songs[i].album_url
        // console.log(imageUrl)
        $(".user-results").prepend(
            '<div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">' +
            '<div class="card">' +
            '<div class="card-body">' +
            '<img src="' + imageUrl + '">' +
            '<h5 class="card-title">' + track + '</h5>' +
            '<h6 class="card-subtitle mb-2">' + artist + '</h6>' +
            '<div class="card-text">' +
            '<a href="' + trackUrl + '" class="card-link" target="_blank">Link to the song / track</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    };
});


var homepageImage = document.getElementById('logoImg')

$(homepageImage).click(function () {
    window.location = './index.html'
});
// var ref = firebase.database().ref();

// ref.on("value", function (snapshot) {
//     console.log(snapshot.val());
// });

// console.log(snapshot.val.song1.track);

