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

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}
var user = 0;
var erledigen = -2;
var erledigt = -2;
var feld = 0;
var event = "";
function drawEvents() {
	feld = 0;
  erledigen = false;
	elementid = 'c_default';
  document.getElementById('c_default').innerHTML = "";
  user = 0;
  if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=list', function(){
    list.forEach(addEvent);
    document.getElementById('i_' + (feld - 1)).style["border-bottom"] = "none";
  });
}
var elementid = 'c_default';
function addEvent(element){
litem = 2;
  if(element.erledigt == -1){
  	if(erledigt != -1){
  		erledigt = -1;
      litem = 3;
  		if(document.getElementById('i_' + (feld - 1)) != null){
  			document.getElementById('i_' + (feld - 1)).style["border-bottom"] = "none";
  		}
  		document.getElementById('c_default').innerHTML += '<div class="litem_001">WIR PLANEN</div>';
  	}

  }
if(element.erledigt == 0){
  if(erledigt != 0){
		erledigt = 0;
		if(document.getElementById('i_' + (feld - 1)) != null){
			document.getElementById('i_' + (feld - 1)).style["border-bottom"] = "none";
		}
		document.getElementById('c_default').innerHTML += '<div class="litem_001">ZU ERLEDIGEN</div>';
	}

}
if(element.erledigt == 1){
  if(erledigt != 1){
		erledigt = 1;
		if(document.getElementById('i_' + (feld - 1)) != null){
			document.getElementById('i_' + (feld - 1)).style["border-bottom"] = "none";
		}
		document.getElementById('c_default').innerHTML += '<div class="litem_001">ERLEDIGT</div><div class="w_001" id="w_001"></div>';
		elementid = "w_001";
	}
}
var myjob = "";
if(element.beauftragt == 01){
	myjob += '<h3 style="background-color: #bb5353">dein Job</h3>';
} else {
	myjob += '<h3 style="background-color: #50a195">' + element.beauftragter + '</h3>';
}
if(litem == 2){
  document.getElementById(elementid).innerHTML += '<a href="javascript:void(0)" onClick="showEvent(\'' + element.id + '\')"><div class="litem_002 ex_001" id="i_' + feld + '"><h3>' + element.kathegorie + '</h3>' + myjob + '<h1>' + element.titel +  '</h1><h2>' + element.untertitel + '</h2></div></a>';
} else if (litem == 3){
  document.getElementById(elementid).innerHTML += '<a href="javascript:void(0)" onClick="showEvent(\'' + element.id + '\')"><div class="litem_003 ex_001" id="i_' + feld + '"><h1>' + element.titel +  '</h1><h2>' + element.untertitel + '</h2></div></a>';
}
feld++;
user++;
}

function sendFeedback(id, feedback, rand) {
  if (typeof someObject == 'undefined'){
    $.loadScript('wattenAPI.php?requesttype=feedback&feedback=' + feedback + '&id=' + id, function(){
      reloadEvent(rand, id);

    });
  }
}
function sendComment(id, rand) {
  if (typeof someObject == 'undefined'){
    $.loadScript('wattenAPI.php?requesttype=comment&feedback=' + document.getElementById('ers_komm').value + '&id=' + id, function(){
      reloadEvent(rand, id);
    });
  }
}
function setGeloescht(id, rand, closeid) {
  if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=delete&id=' + id, function(){
  });
  drawEvents();
  setTimeout(function() {removefromplace(rand);}, 25);
  setTimeout(function() {removefromplace(closeid);}, 25);
  setTimeout(function() {
     var elem = document.getElementById(rand);
     elem.parentNode.removeChild(elem);
  }, 225);
  setTimeout(function() {
     var elem = document.getElementById(closeid);
     elem.parentNode.removeChild(elem);
  }, 225);
  setTimeout(function() {
  fly_001_visible(false);
  }, 225);
}
function setErledigt(id, rand, closeid) {
  if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=done&id=' + id, function(){
  });
  drawEvents();
  setTimeout(function() {removefromplace(rand);}, 25);
  setTimeout(function() {
     var elem = document.getElementById(rand);
     elem.parentNode.removeChild(elem);
  }, 225);
  reloadEvent(closeid, id);
}
function setUnerledigt(id, rand, closeid) {
  if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=todo&id=' + id, function(){
  });
  drawEvents();
  setTimeout(function() {removefromplace(rand);}, 25);
  setTimeout(function() {
     var elem = document.getElementById(rand);
     elem.parentNode.removeChild(elem);
  }, 225);
  reloadEvent(closeid, id);

}


function reloadEvent(fensterid, id){
  if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=entry&id=' + id, function(){
    var fenster = '<a class="close_001" href="javascript:void(0)" onClick="close_fly(\'' + fensterid + '\')">×</a><div class="fly_h_001"><h1>Details</h1></div><div class="fly_c_001">' +
    '<div class="litem_001">' + (entry.erledigt + "").replace('-1', 'WIR PLANEN').replace('1', 'ERLEDIGT').replace('0', 'ZU ERLEDIGEN') + '</div>' +
    '<div class="litem_002 ex_001"><h1>' + entry.titel +  '</h1><h4>' + entry.kathegorie +  '</h4><h2>' + entry.untertitel +  '</h2></div>' +
    '<div class="litem_002 ex_001"><h6>Beschreibung</h6><h2>' + entry.beschreibung +  '</h2></div>' +
    '<div class="litem_002 ex_001"><h6>Beauftragter</h6><h2>' + entry.beauftragter +  '</h2></div>' +
    '<div class="litem_002 ex_001"><h6>Ersteller/zul. bearbeitet</h6><h2>' + entry.ersteller +  '</h2></div>' +
    '<div class="litem_002"><h6>Erstellt</h6><h2>' + entry.erstellt_UT +  '</h2></div>';

    if(entry.feedbackreq == 1){
      fenster += '<div class="litem_001">ABSTIMMUNG</div>' +
      '<div class="litem_002 ex_001"><h6>' + entry.feedbackquest +  '</h6><h2><a class="ja" href="javascript:void(0)" onClick="sendFeedback(' + entry.id + ', \'ja\', \'' + fensterid + '\')">JA</a><a class="nein" href="javascript:void(0)" onClick="sendFeedback(' + entry.id + ', \'nein\', \'' + fensterid + '\')">NEIN</a></h2></div>';
      var feedback = entry.feedback;
      feedback.forEach(function(element){
          fenster += '<div class="litem_005 ' + element.color + '"><p><b>' + element.user + "</b> hat mit " + element.text + ' gestimmt.</p></div>';
      });
    } else
    if(entry.feedbackreq == 2){
      var written = false;
      var feedback = entry.feedback;
        fenster += '<div class="litem_001">KOMMENTARE</div>' +
        '<div class="litem_002"><div class="bf_002 sml" href="javascript:void(0)" onClick="sendComment(' + entry.id + ', \'' + fensterid + '\')"><p>⮞</p></div><h6>Neuer Kommentar</h6><h2><textarea rows="1" cols="50" id="ers_komm"></textarea></h2></div>';
      feedback.forEach(function(element){

          fenster += '<div class="litem_005 gray"><p><b>' + element.user + "</b><br>" + element.text + '</p></div>';
      });
    }

    fenster += '<div class="fly_bf_001 "><a href="javascript:void(0)" onClick="bearbeitenDialog(\'' + entry.id + '\', \'' + fensterid + '\')"><div class="bf_002"><p>🖊</p></div></a>';

    fenster += '</div>';
    document.getElementById(fensterid).innerHTML = fenster;
  });
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
function createDialog(){
	fly_001_visible(true);
	var options = "<option>Alle</option>";
	var rand = rstring();
	if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=users', function(){
    users.forEach(function(element){
		options += "<option>" + element.name + "</option>";
		console.log(element);
		});
		var fenster = '<div class="fly_002" id="' + rand + '"><a class="close_001" href="javascript:void(0)" onClick="close_fly(\'' + rand + '\', \'' + rand + '\')">×</a><div class="fly_h_001"><h1>Organisieren 😎</h1></div><div class="fly_c_001">' +
    '<div class="litem_001">NEUEN TERMIN ERSTELLEN</div>' +
    '<div class="litem_002 ex_001"><h6>Titel</h6><h2><textarea rows="1" cols="50" id="ers_titel"></textarea></h2></div>' +
    '<div class="litem_002 ex_001"><h6>Kathegorie</h6><h2><textarea rows="1" cols="50" id="ers_kathegorie"></textarea></h2></div>' +
    '<div class="litem_002 ex_001"><h6>Untertitel</h6><h2><textarea rows="1" cols="50" id="ers_untertitel"></textarea></h2></div>' +
    '<div class="litem_002 ex_001"><h6>Beschreibung</h6><h2><textarea rows="4" cols="50" id="ers_beschreibung"></textarea></h2></div>' +
    '<div class="litem_002 ex_001"><h6>Beauftragter</h6><h2><select id="ers_beauftragter">' + options + '</select></h2></div>' +
	'<div class="fly_bf_001 "><a href="javascript:void(0)" onClick="sendNewEntry(\'' + rand + '\')"><div class="bf_002 green"><p>✓</p></div></a></div>';
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

	});
}
function bearbeitenDialog(id, closerand){
	fly_001_visible(true);
	var options = "<option>Alle</option>";
	var rand = rstring();
	if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=users', function(){
    users.forEach(function(element){
		options += "<option>" + element.name + "</option>";
	});
if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=entry&id=' + id, function(){
		var fenster = '<div class="fly_002" id="' + rand + '"><a class="close_001" href="javascript:void(0)" onClick="close_fly(\'' + rand + '\', \'' + rand + '\')">×</a><div class="fly_h_001"><h1>' +  entry.titel +  '</h1></div><div class="fly_c_001">' +
    '<div class="litem_001">BESTEHENDE AUFGABE BEARBEITEN</div>' +
    '<div class="litem_002 ex_001"><h6>Titel</h6><h2><textarea rows="1" cols="50" id="bea_titel">' + entry.titel +  '</textarea></h2></div>' +
    '<div class="litem_002 ex_001"><h6>Kathegorie</h6><h2><textarea rows="1" cols="50" id="bea_kathegorie">' + entry.kathegorie +  '</textarea></h2></div>' +
    '<div class="litem_002 ex_001"><h6>Untertitel</h6><h2><textarea rows="1" cols="50" id="bea_untertitel">' + entry.untertitel +  '</textarea></h2></div>' +
    '<div class="litem_002 ex_001"><h6>Beschreibung</h6><h2><textarea rows="4" cols="50" id="bea_beschreibung">' + entry.beschreibung +  '</textarea></h2></div>' +
    '<div class="litem_002 ex_001"><h6>Beauftragter</h6><h2><select id="bea_beauftragter">' + options + '</select></h2></div>' +
	'<div class="fly_bf_001"><a href="javascript:void(0)" onClick="bearbeitenEntry(\'' + rand + '\',\'' + entry.id  + '\',\'' + closerand + '\')"><div class="bf_002 green"><p>✓</p></div></a><a href="javascript:void(0)" onClick="setGeloescht(\'' + entry.id + '\', \'' + rand + '\',\'' + closerand + '\')"><div class="bf_002 red"><p>✗</p></div></a>';
  if(entry.erledigt == 0){
		fenster += '<a href="javascript:void(0)" onClick="setErledigt(\'' + entry.id + '\', \'' + rand + '\',\'' + closerand + '\')"><div class="bf_002 green"><p>👍</p></div></a></div>';
	} else if(entry.erledigt == 1){
		fenster += '<a href="javascript:void(0)" onClick="setUnerledigt(\'' + entry.id + '\', \'' + rand + '\',\'' + closerand + '\')"><div class="bf_002 orange"><p>👎</p></div></a></div>';
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
		});

	});


}
function sendNewEntry(rand){
  var send = 'wattenAPI.php?requesttype=create';
  send += '&titel=' + document.getElementById('ers_titel').value;
  send += '&kathegorie=' + document.getElementById('ers_kathegorie').value;
  send += '&untertitel=' + document.getElementById('ers_untertitel').value;
  send += '&beschreibung=' + document.getElementById('ers_beschreibung').value;
  send += '&beauftragter=' + document.getElementById('ers_beauftragter').value;
  send += '&erledigt=0';
  console.log(send);
  if (typeof someObject == 'undefined') $.loadScript(send, function(){
      drawEvents();
      setTimeout(function() {removefromplace(rand);}, 25);
      setTimeout(function() {
      fly_001_visible(false);
      }, 225);
  });
}
function bearbeitenEntry(rand, id, closeid){
  var send = 'wattenAPI.php?requesttype=edit';
  send += '&id=' + id;
  send += '&titel=' + document.getElementById('bea_titel').value;
  send += '&kathegorie=' + document.getElementById('bea_kathegorie').value;
  send += '&untertitel=' + document.getElementById('bea_untertitel').value;
  send += '&beschreibung=' + document.getElementById('bea_beschreibung').value;
  send += '&beauftragter=' + document.getElementById('bea_beauftragter').value;
  console.log(send);
  if (typeof someObject == 'undefined') $.loadScript(send, function(){
      drawEvents();
      setTimeout(function() {removefromplace(rand);}, 25);
      setTimeout(function() {
         var elem = document.getElementById(rand);
         elem.parentNode.removeChild(elem);
      }, 225);
      reloadEvent(closeid, id);
  });
}
function drawMembers() {
  user = 0;
  if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=users', function(){
    users.forEach(addMember);
    document.getElementById('c_default').innerHTML += '<div class="litem_002"></img><h1>' + user + ' Personen</h1><h2>Sind zurzeit angemeldet.</h2></div>';
  });
}
function addMember(element){
  document.getElementById('c_default').innerHTML += '<a href="javascript:void(0)" onClick="showUser(\'' + element.name + '\')"><div class="litem_002 ex_001"><img src="../userpp/' + element.pic + '"></img><h1>' + element.name +  '</h1><h2>Für Infos klicken</h2></div></a>';
  user++;
}
function showUser(user){
  if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=userspec&username=' + user, function(){
		fly_001_visible(true);
		var rand = rstring();
		var fenster = '<div class="fly_002" id="' + rand + '"><a class="close_001" href="javascript:void(0)" onClick="close_fly(\'' + rand + '\')">×</a><div class="fly_h_001"><h1>' + user + '</h1></div><div class="fly_c_001"><div class="litem_001">BENUTZERINFOS</div><div class="litem_002 ex_001"><h6>Nickname</h6><h2>' + user +  '</h2></div><div class="litem_002"><h6>Echter Name</h6><h2>' + person.firstName + " " + person.lastName +  '</h2></div></div></div>';
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
  });
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
function changeGroup(group){
  if (typeof someObject == 'undefined') $.loadScript('wattenAPI.php?requesttype=changegroup&group=' + group, function(){
      document.getElementById('nav').style.left = "-400px";
    	document.getElementById('fly_001').style["opacity"] = 0;
    	document.getElementById('fly_001').style["pointer-events"] = "none";
    	var elem = document.getElementById('fly_000').innerHTML = "";
      drawEvents();
  });
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
        fenster += '<div class="litem_001">FORTSCHRITT</div>' +
        '<div class="litem_002 ex_001"><h6>Fortschritt in Prozent</h6><h2>' + resp.prozent +  '%</h2></div>' +
        '<div class="litem_002 ex_001"><h6>Fortschritt in Punkten</h6><h2>' + resp.wert + " / " + resp.zielwert +  '</h2></div>' +
        '<div class="litem_002 ex_001"><h6>Zeit verbleibend</h6><h2>' + resp.restzeit +  '</h2></div>';
        if(resp.protocoll.length > 3){
          fenster += '<div class="litem_001">PROTOKOLL</div>';
          console.log(resp.protocoll.replace(/'/g,'"'));
          var json = JSON.parse(resp.protocoll.replace(/'/g,'"'));
          json.forEach(function(element){
            fenster += '<div class="litem_005 blue"><p>' + element + '</p></div>';
          });
          fenster += '<div class="litem_001">CHALLENGE DETAILS</div>' +
          '<div class="litem_002 ex_001"><h1>' + resp.titel +  '</h1><h4>' + resp.kathegorie +  '</h4><h2>' + resp.kurz +  '</h2></div>' +
          '<div class="litem_002 ex_001"><h6>Beschreibung</h6><h2>' + resp.lang +  '</h2></div>' +
          '<div class="litem_002 ex_001"><h6>Dauer der Challenge</h6><h2>' + resp.dauer +  '</h2></div>';
        }
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
        '<div class="litem_002 ex_001"><h6>Beschreibung</h6><h2>' + resp.lang +  '</h2></div>' +
        '<div class="litem_002 ex_001"><h6>Dauer der Challenge</h6><h2>' + resp.dauer +  '</h2></div>';
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
