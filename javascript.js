//javascript functions

var _url = "https://api.github.com/gists?page=1&per_page=100";
var _url2 = "https://api.github.com/gists?page=50&per_page=50";
var gistsDom =  document.getElementById("gists");
var favoritesDom = document.getElementById("favorites");

var bigArray = []; 
var pageNumber = localStorage.getItem("pageNumber");
var favoritesArray = [];
var favoritesArray2 = [];

window.onload = function() {
	
	loadXMLDoc();
}

function loadXMLDoc() {
	var httpRequest;
	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	else {
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function gist (Description, ID, html_url) {
	this.description = Description;
	this.id = ID;
	this.url = html_url;
	this.favoritesButton = "Favorite";
	this.convertToHtml = function () {
		var holder = document.createElement("div");
		holder.className = "gistsHolder";
		
		var url = document.createElement("div");
		var description = document.createElement("div");
		var id = document.createElement("div");
		var favoritesButton = document.createElement("button");
		
		url.className = "gistsUrl";
		id.className = "gistsId";
		description.className =	"gistsDescription";
		favoritesButton.className = "gistsFavoriteButton";

		description.innerHTML = this.description;	
		id.innerHTML = this.id
		url.innerHTML = this.url;
		favoritesButton.innerHTML = this.favoritesButton;
		
		holder.appendChild(description);
		holder.appendChild(url);
		holder.appendChild(id);
		holder.appendChild(favoritesButton);

		gistsDom.appendChild(holder);
		
		favoritesButton.onclick = function favoritesFunction(){
			var f = new gistFavorites(Description, ID, html_url);
			favoritesArray.push(f);
			localStorage.setItem("favorites", JSON.stringify(favoritesArray));
			f.convertToHtml();
		}
	}
}


function gistFavorites (Description, ID, html_url) {
	this.description = Description;
	this.id = ID;
	this.url = html_url;
	this.removeButton = "Remove";
	this.convertToHtml = function () {
		var holder = document.createElement("div");
		holder.className = "gistsHolder";
		var url = document.createElement("div");
		var description = document.createElement("div");
		var id = document.createElement("div");
		var removeButton = document.createElement("button");
		
		url.className = "gistsUrl";
		id.className = "gistsId";
		description.className =	"gistsDescription";
		removeButton.className = "gistsRemoveButton";
		description.innerHTML = this.description;
		
		id.innerHTML = this.id;
		url.innerHTML = this.url;
		removeButton.innerHTML = this.removeButton;
		
		holder.appendChild(description);
		holder.appendChild(url);
		holder.appendChild(id);
		holder.appendChild(removeButton);
		favoritesDom.appendChild(holder);
		removeButton.onclick = function removeFunction(){
			
		}
	}
}

function makeAjaxCall(url) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", url, true);
	httpRequest.send(null);
	httpRequest.onreadystatechange = function() {
			if(httpRequest.readyState == 4) {
				if (httpRequest.status == 200) {
					var serverResponse = JSON.parse(httpRequest.responseText);
					var gists = serverResponse;
					var gistsArray = [];
					for (var i = 0; i < gists.length; i ++) {
						if (gists[i].description == "") {
							gists[i].description = "No description";
						}
						var g = new gist(gists[i].description, gists[i].id, gists[i].url);
						
						gistsArray.push(g);
						bigArray.push(g);
					}
					
					localStorage.setItem("gists", (JSON.stringify(bigArray)));
				} else {
					alert("Error!");
				}
			
			} 
		
	}

}

function checklocalstorage(){
	var gists = localStorage.getItem("gists");
	var gistsFromLocal = JSON.parse(localStorage.getItem("gists"));
	var favoriteLocalGists = JSON.parse(localStorage.getItem("favorites"));

	if(gists === "[]" | gists === null){
		makeAjaxCall(_url);
		makeAjaxCall(_url2);
		
		pages(pageNumber);
		
	}else{
		favoritesArray2 = favoriteLocalGists;
		bigArray = gistsFromLocal;
		pages(pageNumber);
		loadFavorites();
		
	}
	
}

function updateAPI(){
	localStorage.removeItem("gists");
	makeAjaxCall(_url);
	makeAjaxCall(_url2);
}

function loadFavorites(){
	for (var i = 0; i < favoritesArray2.length; i ++) {
		var g = new gistFavorites(favoritesArray2[i].description, favoritesArray2[i].id, favoritesArray2[i].url);
		g.convertToHtml();
	}
}

function pages(page){
	
	document.getElementById("gists").innerHTML = " ";
	
	pageNumber = page;
	localStorage.setItem("pageNumber", pageNumber);
	var start = 0;
	var stop = 29;
	if(pageNumber == 1){
		start = 0;
		stop = 29;
	}
	if(pageNumber == 2){
		start = 30;
		stop = 59;
	}
	if(pageNumber == 3){
		start = 60;
		stop = 89;
	}
	if(pageNumber == 4){
		start = 90;
		stop = 119;
	}
	if(pageNumber == 5){
		start = 120;
		stop = 149;
	}
	for (var i = start; i < stop; i ++) {
		var g = new gist(bigArray[i].description, bigArray[i].id, bigArray[i].url);
		g.convertToHtml();
	}
}

checklocalstorage();
