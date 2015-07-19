//javascript functions

var _url = "https://api.github.com/gists?page=1&per_page=100";
var _url2 = "https://api.github.com/gists?page=50&per_page=50";
var gistsDom =  document.getElementById("gists");

var bigArray = []; 
var pageNumber = localStorage.getItem("pageNumber");

window.onload = function() {
	var submitButton = document.getElementById("tfq");
	if (submitButton.addEventListener) {
		submitButton.addEventListener("click", function(){
			if(submitButton.value == "Enter keywords...") {
				submitButton.value = "";
			}
		});
	}
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

function gist (description, id, html_url) {
	this.description = description;
	this.id = id;
	this.url = html_url;
	this.convertToHtml = function () {
		var holder = document.createElement("div");
		holder.className = "gistsHolder";
		var url = document.createElement("div");
		var description = document.createElement("div");
		var id = document.createElement("div");
		

		url.className = "gistsUrl";
		id.className = "gistsId";
		description.className =	"gistsDescription";

		description.innerHTML = this.description;
		
		id.innerHTML = this.id;

		url.innerHTML = this.url;

		holder.appendChild(description);
		holder.appendChild(url);
		holder.appendChild(id);

		gistsDom.appendChild(holder);
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
	pageNumber = 1;
	if(gists === "[]" | gists === null){
		makeAjaxCall(_url);
		makeAjaxCall(_url2);
		
		pages(pageNumber);
		
	}else{
		
		bigArray = gistsFromLocal;
		pages(pageNumber);
		
		}
}

function pages(page){
	
	document.getElementById("gists").innerHTML = " ";
	
	pageNumber = page;
	localStorage.setItem("pageNumber", (pageNumber));
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

