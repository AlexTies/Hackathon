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
  <h1>Deine Freunde</h1>
</div>
<div class="c_001" id="c_default">
  <div class="litem_001">RANKING</div>
  <?php
  require_once('konfiguration.php');
  session_start();
  $pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
  $statement = $pdo->prepare("SELECT Friends FROM users WHERE username = :username");
  $result = $statement->execute(array('username' => $_SESSION['username']));
  $respo = $statement->fetch();
  $sql = "SELECT * FROM users ORDER BY ScoreTOTAL DESC;";
  $users = $pdo->query($sql);
  $zaeler = 1;
  foreach ($users as $row) {
    if(strpos($respo['Friends'], $row['username']) !== false){
      echo '<div class="litem_002 ex_001" id="i_1"><h7>#' . $zaeler . '</h7><img src="user.jpg"><h5 style="background-color: #50a195">' . $row['ScoreTOTAL'] . '</h5><h5>' . $row['ScoreTODAY'] . '</h5><h1>' . $row['username'] . '</h1><h2>' . $row['vorname'] . ' ' . $row['nachname']  . '</h2></div>';
      $zaeler = $zaeler + 1;
    }
  }
  ?>
</div>
<div class="f_001">
  <ul>
    <li>
      <a href="./index.php">Übersicht</a>
    </li>
    <li>
      <a href="./members.php" class="selected">Mitglieder</a>
    </li>
  </ul>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="./windows.js"></script>
</body>
</html>
