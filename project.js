//Global Variables
var body = document.getElementById("body");
var wikiContainer = document.querySelector(".wikipediaContainer");
var wikiResultsContainer = document.querySelector(".wikipediaResultsContainer");
var youtubeContainer = document.querySelector(".youtubeVidsContainer");
var youtubeResultsContainer = document.querySelector(".youtubeResultsContainer");
var title = "";
var description = ""; 
var urlWiki = ""; 
var titleArray = [];
var descriptionArray = []; 
var counter = 0; 
var resultNumber;



//Global event listeners

//Youtube Page
$("#youtubeMenuLink").on("click", function(event) {
    event.preventDefault();
    $(".wikipediaContainer").hide();
    $(".header").hide(); 
    $(".card1").hide(); 
    $(".card2").hide();
    $(".youtubeVidsContainer").show(); 
});
//Youtube Page Image Click
$("#youtubeImgLink").on("click", function(event) {
    event.preventDefault();
    $(".wikipediaContainer").hide();
    $(".header").hide(); 
    $(".card1").hide(); 
    $(".card2").hide();
    $(".youtubeVidsContainer").show(); 
});
//Homepage
$("#homepageMenuLink").on("click", function(event) {
    event.preventDefault();
    $(".wikipediaContainer").hide();
    $(".header").show(); 
    $(".card1").show(); 
    $(".card2").show();
    $(".youtubeVidsContainer").hide(); 
});
//Wiki Page
$("#wikipediaMenuLink").on('click', function(event){
    event.preventDefault();
    $(".wikipediaContainer").show();
    $(".header").hide(); 
    $(".card1").hide(); 
    $(".card2").hide();
    $(".youtubeVidsContainer").hide(); 
});
//Wiki Page Image Click
$("#wikipediaImgLink").on('click', function(event){
    event.preventDefault();
    $(".wikipediaContainer").show();
    $(".header").hide(); 
    $(".card1").hide(); 
    $(".card2").hide();
    $(".youtubeVidsContainer").hide(); 
});

//Make sure everything looks nice whenever you reload the page
function start(){
    $(".wikipediaContainer").hide();
    $(".header").show(); 
    $(".card1").show(); 
    $(".card2").show();
    $(".youtubeVidsContainer").hide(); 
}

//Youtube Generator
$('#youtubeMaxResults').keypress(function(event){
    resultNumber = document.getElementById("youtubeMaxResults").value;
    youtubeResultsContainer.innerHTML = "";
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        getTrendingVideos();
    }
});


//This needs to get input from number value input bar for the amount of search results the user wants
function getTrendingVideos(){
    $.get("https://www.googleapis.com/youtube/v3/videos",{
            part: "contentDetails",
            chart: "mostPopular",
            maxResults: resultNumber,
            key: "AIzaSyBiYHvc93b-GQWnlYNHImIAqNbAuRwXgfs"},
      function(data){
          var output;
          $.each(data.items, function(i,item){
              console.log(item);
              var videoID = item.id;
              output = document.createElement("iframe");
              output.setAttribute("src","//www.youtube.com/embed/"+videoID);
              output.setAttribute("allowfullscreen","true");
              output.setAttribute("frameborder","0");
              output.setAttribute("width","90%");
              output.setAttribute("height","400px");
              output.setAttribute("class","youtubeVids");
              youtubeResultsContainer.appendChild(output);
            })
        }
    );
}

//This needs to get search term from Curtis's search bar and display the data
$(".wikiInput").on("click", function(event){
    wikiResultsContainer.innerHTML = "";
    $("#wikiText").hide();
    titleArray = [];
    descriptionArray = []; 
    counter = 0; 
    var searchTerm = $(".wikiContent").val();
    event.preventDefault(); 
$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=mostviewed&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=" + searchTerm,
    type: 'GET',
    headers: {
        'Access-Control-Allow-Origin':'localhost:5600'
    }   
    }).then(function(response){
        return response
    }).then(function(data){
        for(i in data.query.pages) {
            title = data.query.pages[i].title;
            titleArray.push(data.query.pages[i].title);
        }
        console.log(titleArray);
        for (var i = 0; i < 5; i++) {
            console.log(titleArray[i]);
            getDescription(titleArray[i]);
        }
        console.log(descriptionArray);
    }).catch(function(error){
        console.log('This is my error '+ error)
    });

function getDescription(getTitle){
$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/api/rest_v1/page/summary/" + getTitle,
    type: 'GET',
    headers: {
        'Access-Control-Allow-Origin':'localhost:5600'
    }  
}).then(function(response){
    return response
}).then(function(data){
    description = data.extract; 
    descriptionArray.push(description); 
    displayWikiData();
}).catch(function(error){
    console.log('This is my error '+ error)
});

}

//Displays the wiki data
function displayWikiData(){

        var titleElement = document.createElement("h1");
        titleElement.setAttribute("class", "wikiTitle");
        titleElement.innerHTML = titleArray[counter];

        var descriptionElement = document.createElement("p");
        descriptionElement.setAttribute("class", "wikiDesc");
        descriptionElement.innerHTML = descriptionArray[counter]; 

        var testDiv = document.createElement("div");
        testDiv.appendChild(titleElement);
        testDiv.appendChild(descriptionElement); 

        wikiResultsContainer.appendChild(testDiv);

        counter++
}

});

//Clean up page on reload
start();
