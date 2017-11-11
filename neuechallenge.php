<?php
session_start();
?>
<html>
<head>
<link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
<link href="./design.css" rel="stylesheet">
<meta name="viewport" content="width=430">
</head>
<body>
  <div class="n_001" id="nav">
    <div class="fly_h_001">
      <h1>New Challenge</h1>
    </div>
    <a class="close_001" href="javascript:void(0)" onClick="close_nav()">×</a>
    <div class="n_002">
      <div class="litem_001">KATHEGORIES</div>
      <?php
      require_once('konfiguration.php');
      $pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
       ?>
  <a onClick="setKatFB('living')" href="javascript:void(0)"><div class="litem_002" style="background-color: SteelBlue;"><h1>Living<h2>What you can do at home</h2></div></a>
  <a onClick="setKatFB('nutrition')" href="javascript:void(0)"><div class="litem_002" style="background-color: SeaGreen;"><h1>Nutrition<h2>Improving your way of eating</h2></div></a>
  <a onClick="setKatFB('mobility')" href="javascript:void(0)"><div class="litem_002" style="background-color: SlateBlue;"><h1>Mobility<h2>Get where your going more enviorment friendly</h2></div></a>
  <a onClick="setKatFB('consumtion')" href="javascript:void(0)"><div class="litem_002" style="background-color: #B22222;"><h1>Consumption<h2>Think twice what you really need</h2></div></a>
  <a onClick="setKatFB('society')" href="javascript:void(0)"><div class="litem_002" style="background-color: #FFA62F;"><h1>Society<h2>Let's do something for our society</h2></div></a>
    </div>
  </div>
  <div class="fly_001" id="fly_001" onclick="fly_001_visible(false)"></div>
  <div class="fly_000" id="fly_000"></div>
<div class="h_001">
  <div class="h_002">
    <a class="menu_001" href="javascript:void(0)" onClick="open_nav()">☰</a>
    <h1>New Challange</h1>
  </div>
</div>
<div class="c_001">
  <div class="c_004">
    <a style="text-align: left;" onclick="last()" href="javascript:void(0)">← Last</a>
  </div>
    <div class="c_004">
      <a onclick="next()" href="javascript:void(0)">Next →</a>
    </div>
</div>
<div class="c_001" id="c_default">

</div>
<div class="f_001">
  <ul>
    <li>
      <a href="./index.php" class="selected">Übersicht</a>
    </li>
    <li>
      <a href="./members.php">Mitglieder</a>
    </li>
  </ul>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="./windows.js"></script>
  <?php
  $push = array('living' => array(), 'nutrition' => array(),'mobility' => array(),'consumtion' => array(),'society' => array());
  $sql = "SELECT * FROM allechallenges;";
  $users = $pdo->query($sql);
  foreach ($users as $row) {
    $arr = $push[$row['Kathegorie']];
    $insert = array('titel' => $row['Titel'], 'kurz' => $row['Kurz'], 'id' => $row['Prime']);
    array_push($arr, $insert);
    $push[$row['Kathegorie']] = $arr;
  }
  $ausgabe = json_encode($push);
   ?>
<script>
var count = 0;
function next(){
  if(count < 4){
    count++;
  }
  setKat(verf[count]);
}
function last(){
  if(count > 0){
    count--;
  }
  setKat(verf[count]);
}
var verf = ['living', 'nutrition','mobility','consumtion','society'];
var kath = <?php echo $ausgabe . ";\n"; ?>
function setKat(kat){
  document.getElementById("c_default").innerHTML ='<div class="litem_001">' + kat.toUpperCase() + '</div>';
  kath[kat].forEach(function(element) {
    console.log(element);
    var hold = '<a href="javascript:void(0)" onClick="showChallenge(\'' + element.id + '\')"><div class="litem_002 ex_001"><h1>'  + element.titel +  '</h1><h2>' + element.kurz +  '</h2></div></a>';
    document.getElementById("c_default").innerHTML += hold;
  });
}
function setKatFB(kat){
  close_nav();
  setKat(kat);
}
setKat('nutrition');
</script>
</body>
</html>
