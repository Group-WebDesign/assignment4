//javascript functions
//javascript functions

var _url = "http://crossorigin.me/https://api.github.com/gists"

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
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function makeAjaxCall(url) {
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);

	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
			//responseText
			}
		} else {
			alert("Error!");
		}
	}
}