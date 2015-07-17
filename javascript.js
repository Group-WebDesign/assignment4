//javascript functions

var _url = "https://api.github.com/gists";
var gistsDom =  document.getElementById("gists");

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

		holder.appendChild(url);
		holder.appendChild(id);
		holder.appendChild(description);

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
						var g = new gist(gists[i].description, gists[i].id, gists[i].url);
						gistsArray.push(g);
						g.convertToHtml();
					}
				}else {
					alert("Error!");
				}
			} 
		
	}
}


makeAjaxCall(_url);