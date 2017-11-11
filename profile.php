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
  <h1>Dein Profil</h1>
</div>
<div class="c_001" id="c_default">
  <div class="litem_007 ex_001">
    <?php
    session_start();
    require_once('konfiguration.php');
    $pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
    $statement = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $result = $statement->execute(array('username' => $_SESSION['username']));
    $user = $statement->fetch();

    ?>
    <center>
    <img src="user.jpg" />
    <h1><?php echo $user['vorname'] . " " . $user['nachname']; ?></h2>
      <h2><?php echo "Score " . $user['ScoreTOTAL'] . " | Heute " . $user['ScoreTODAY']; ?></h2>
  </center>
  </div>
  <div class="litem_002">
    <h6>Your Data</h6>
    <?php echo "Körpergroesse: " . $user['Koerpergroesse'] . " cm<br>"; ?>
    <?php echo "Gewicht: " . $user['Gewicht'] . " Kg<br>"; ?>
    <?php echo "Fitness: " . str_replace("2","sehr gut",str_replace("0","schlecht",str_replace("1","gut",$user['Fitness']))) . "<br>"; ?>
    <?php echo "Ernährung: " . $user['Ernaehrung'] . "<br>"; ?>
  </div>

  <div class="litem_002"><h6>Account Optionen</h6><h2><a class="button" href="javascript:void(0)">Password ändern</a><a class="button" href="javascript:void(0)">Abmelden</a></h2></div>
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
