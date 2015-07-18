//javascript functions

var _url = "https://api.github.com/gists?page=1&per_page=100";
var _url2 = "https://api.github.com/gists?page=2&per_page=50";
var gistsDom =  document.getElementById("gists");

var bigArray = []; 

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
						g.convertToHtml();
						bigArray.push(g);
						localStorage.setItem("gists", (JSON.stringify(bigArray)));
						
					}
				} else {
					alert("Error!");
				}
			} 
		
	}

}
function checklocalstorage(){
	var gists = localStorage.getItem("gists");
	if(gists === "[]" | gists === null){
		makeAjaxCall(_url);
		makeAjaxCall(_url2);
		
	}else{
		var parsedArray = JSON.parse(localStorage.getItem("gists"));
		for (var i = 0; i < parsedArray.length; i ++) {
			var g = new gist(parsedArray[i].description, parsedArray[i].id, parsedArray[i].url);
			g.convertToHtml();
		}
	
	//alert("localStorage: gists - filled with " parsedArray.length "gists");
		}
}
checklocalstorage();

