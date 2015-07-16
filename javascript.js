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

	var trialGist = GET /gists/public;
}

function loadXMLDoc() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	}
	else {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function gists (description, id, html_url) {
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

		holder.appendChild(html_url);
		holder.appendChild(id);
		holder.appendChild(description);

		gistsDom.appendChild(holder);
	}

function makeAjaxCall(url) {
	request.open("GET", url, true);
	request.send(null);

	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if (request.status == 200) {
				var serverResponse = JSON.parse(request.responseText);
				var gists = serverResponse.data.gists;
				var gistsArray = [];
				for (var i = 0; i < gists.length; i ++) {
					var g = new gists(gists[i].description, gists[i].id, gists[i].url);
					gistsArray.push(g);
					g.convertToHtml();
				}
			}
		} else {
			alert("Error!");
		}
	}
}

makeAjaxCall(_url);