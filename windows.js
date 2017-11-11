function enterFullscreen() {
  if(document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if(document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if(document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  } else if(document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  }
}

function fly_001_visible(parameter){
	if(parameter){
		document.getElementById('fly_001').style["opacity"] = 0.5;
		document.getElementById('fly_001').style["pointer-events"] = "auto";
	} else {
    close_nav();
		document.getElementById('fly_001').style["opacity"] = 0;
		document.getElementById('fly_001').style["pointer-events"] = "none";
		var elem = document.getElementById('fly_000').innerHTML = "";

	}
}
function close_fly(fly){
    setTimeout(function() {removefromplace(fly);}, 25);
    setTimeout(function() {
		var elem = document.getElementById(fly);
		elem.parentNode.removeChild(elem);
		if(document.getElementById('fly_000').innerHTML.replace(' ','').length < 10){
			document.getElementById('fly_001').style["opacity"] = 0;
			document.getElementById('fly_001').style["pointer-events"] = "none";
		}
  }, 225);
}

function rstring() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function movetoplace(numr){
if(screen.width < 500){
  document.getElementById(numr).style["top"] = '0%';
} else {
  document.getElementById(numr).style["top"] = '10%';
}
  document.getElementById(numr).style["opacity"] = '1';
}
function removefromplace(numr){
if(screen.width < 500){
  document.getElementById(numr).style["top"] = '5%';
} else {
  document.getElementById(numr).style["top"] = '15%';
}
  document.getElementById(numr).style["opacity"] = '0';
}




function close_nav(){
  document.getElementById('nav').style.left = "-400px";
	document.getElementById('fly_001').style["opacity"] = 0;
	document.getElementById('fly_001').style["pointer-events"] = "none";
	var elem = document.getElementById('fly_000').innerHTML = "";
}
function open_nav(){
  document.getElementById('nav').style.left = "0px";
  fly_001_visible(true);
}
//BEHALTEN
function showDetailsAccepted(id){
    fly_001_visible(true);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var rand = rstring();
        var resp = JSON.parse(this.responseText);
        var fenster = '<div class="fly_002" id="' + rand + '"><a class="close_001" href="javascript:void(0)" onClick="close_fly(\'' + rand + '\')">×</a><div class="fly_h_001"><h1>Details</h1></div><div class="fly_c_001">';
        fenster += '<div class="litem_001">Progress</div>' +
        '<div class="litem_002 ex_001"><h6>Progress/percent</h6><h2>' + resp.prozent +  '%</h2></div>' +
        '<div class="litem_002 ex_001"><h6>Progress/points</h6><h2>' + resp.wert + " / " + resp.zielwert +  '</h2></div>' +
        '<div class="litem_002 ex_001"><h6>Time left</h6><h2>' + resp.restzeit +  '</h2></div>';
        '<div class="litem_002 ex_001"><h6>Approve</h6><h2><a class="ja" href="javascript:void(0)" onclick="sendHaken(\'' + resp.id + '\', \'' + rand + '\')">Approve</a></h2></div>';

        fenster += '<div class="fly_bf_001" id="fbf001"><a href="javascript:void(0)" onClick="challengeAbhaken(\'' + id + '\',\'LOL\',\'' + rand + '\')"><div class="bf_002 green"><p>✓</p></div></a></div>';

        if(resp.protocoll.length > 3){
          fenster += '<div class="litem_001">PROTOCOL</div>';
          console.log(resp.protocoll.replace(/'/g,'"'));
          var json = JSON.parse(resp.protocoll.replace(/'/g,'"'));
          json.forEach(function(element){
            fenster += '<div class="litem_005 blue"><p>' + element + '</p></div>';
          });
        }

        fenster += '<div class="litem_001">CHALLENGE DETAILS</div>' +
        '<div class="litem_002 ex_001"><h1>' + resp.titel +  '</h1><h4>' + resp.kathegorie +  '</h4><h2>' + resp.kurz +  '</h2></div>' +
        '<div class="litem_002 ex_001"><h6>Description</h6><h2>' + resp.lang +  '</h2></div>' +
        '<div class="litem_002 ex_001"><h6>Duration</h6><h2>' + resp.dauer +  '</h2></div>';
        fenster += '</div></div>';
        document.getElementById('fly_000').innerHTML += fenster;
        if(screen.width < 500){
          document.getElementById(rand).style["top"] = '5%';
        } else {
          document.getElementById(rand).style["top"] = '15%';
        }
        document.getElementById(rand).style["opacity"] = '0';
        document.getElementById(rand).style["transition-delay"] = '0s';
        document.getElementById(rand).style["transition"] = '0.2s';
        setTimeout(function() {movetoplace(rand);}, 25);
      }
    };
    xmlhttp.open("POST", "API.php?action=showdetailacc", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("id=" + id);

}
function showChallenge(id){
    fly_001_visible(true);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var rand = rstring();
        var resp = JSON.parse(this.responseText);
        var fenster = '<div class="fly_002" id="' + rand + '"><a class="close_001" href="javascript:void(0)" onClick="close_fly(\'' + rand + '\')">×</a><div class="fly_h_001"><h1>Details</h1></div><div class="fly_c_001">' +
        '<div class="litem_002 ex_001"><h1>' + resp.titel +  '</h1><h4>' + resp.kathegorie +  '</h4><h2>' + resp.kurz +  '</h2></div>' +
        '<div class="litem_002 ex_001"><h6>Description</h6><h2>' + resp.lang +  '</h2></div>' +
        '<div class="litem_002 ex_001"><h6>Duration</h6><h2>' + resp.dauer +  '</h2></div>';
        if(!resp.bereits){
          fenster += '<div class="fly_bf_001" id="fbf001"><a href="javascript:void(0)" onClick="challangeAnnehmen(\'' + id + '\')"><div class="bf_002 green"><p>✓</p></div></a></div>';
        }
        fenster += '</div></div>';
        document.getElementById('fly_000').innerHTML += fenster;
        if(screen.width < 500){
          document.getElementById(rand).style["top"] = '5%';
        } else {
          document.getElementById(rand).style["top"] = '15%';
        }
        document.getElementById(rand).style["opacity"] = '0';
        document.getElementById(rand).style["transition-delay"] = '0s';
        document.getElementById(rand).style["transition"] = '0.2s';
        setTimeout(function() {movetoplace(rand);}, 25);
      }
    };
    xmlhttp.open("POST", "API.php?action=showdetail", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("id=" + id);
}
function challangeAnnehmen(id){
  console.log("HALLO");
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('fbf001').innerHTML = '<div class="litem_005 green"><p>Challenge accepted!</p></div>';
      setTimeout(function() {movetoplace(rand);}, 25);
    }
  };
  xmlhttp.open("POST", "API.php?action=accept", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("id=" + id);
}
function challengeAbhaken(id, add, close){
  console.log("HALLO");
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  };
  xmlhttp.open("POST", "API.php?action=abhaken", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("id=" + id + "&protokoll=" + add);
  close_fly(close);
}
