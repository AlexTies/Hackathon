<html>
<head>
<link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
<link href="./design.css" rel="stylesheet">
<meta name="viewport" content="width=430">
  </head>
<body>
<div class="fly_001" id="fly_001" onclick="fly_001_visible(false)"></div>
<div class="fly_000" id="fly_000"></div>
<div class="h_001">
  <h1>Your Challenges</h1>
</div>
<div class="c_001" id="c_default">
  <?php
  require_once('konfiguration.php');
  session_start();
  $pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
  $push = array('living' => array(), 'nutrition' => array(),'mobility' => array(),'consumption' => array());
  $sql = "SELECT * FROM aktzeptiertechallenges WHERE Name='" . $_SESSION['username'] . "';";
  $ret0 = $pdo->query($sql);
  foreach ($ret0 as $row) {
    $statement = $pdo->prepare("SELECT * FROM allechallenges WHERE Prime = :id");
    $result = $statement->execute(array('id' => $row["ID"]));
    $ret1 = $statement->fetch();
    $hold = '<a href="javascript:void(0)" onClick="showDetailsAccepted(\'' . $row["ID"] . '\')"><div class="litem_002 ex_001"><h3>' . $ret1['Dauer'] .  '</h3><h3 style="background-color: #00b9b9;">' . $row['fortschritt'] .  '%</h3><h1>' . $ret1['Titel'] .  '</h1><h2>' . $ret1['Kurz'] .  '</h2></div></a>';
    array_push($push[$ret1['Kathegorie']], $hold);

  }
  $oldkey = "";
  foreach ($push as $key => $value) {
    if(sizeof($value) > 0){
    if($oldkey != $key){
      echo '<div class="litem_001">' . strtoupper($key) . '</div>';
      $oldkey = $key;
    }
    foreach ($value as $vvalue) {
    echo $vvalue;
    }
  }
  }
  ?>
</div>
<div class="bf_001">
  <div id="bf_buttons">
    <a href="./neuechallenge.php"><div class="bf_002" style="color: white;"><p>＋</p></div></a>
  </div>
</div>
<div class="f_001">
  <ul>
    <li>
      <a href="./index.php">Home</a>
    </li>
    <li>
      <a href="./challenges.php"  class="selected">Challenges</a>
    </li>
    <li>
      <a href="./friends.php">Friends</a>
    </li>
  </ul>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="./windows.js"></script>
</body>
</html>
