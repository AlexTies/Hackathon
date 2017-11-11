<?php
session_start();
if(isset($_GET['action'])){
if($_GET['action'] == "showdetail"){
    $id = $_POST["id"];
    require_once('konfiguration.php');
    $pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
    $statement = $pdo->prepare("SELECT * FROM allechallenges WHERE Prime=:id");
    $result = $statement->execute(array('id' => $id));
    $answr = $statement->fetch();

    $statement = $pdo->prepare("SELECT * FROM aktzeptiertechallenges WHERE Name = :username AND ID=:id");
    $result = $statement->execute(array('username' => $_SESSION['username'], 'id' => $id));
    $respo = $statement->fetch();

    if ($respo !== false) {
      $ent = true;
    } else {
      $ent = false;
    }
    echo '{"titel":"' . $answr['Titel'] . '",
    "kathegorie":"' . $answr['Kathegorie'] . '",
    "kurz":"' . $answr['Kurz'] . '",
    "dauer":"' . $answr['Dauer'] . '",
    "bereits":"' . $ent . '",
    "lang":"' . $answr['Lang'] . '"}';
   }
   if($_GET['action'] == "showdetailacc"){
       $id = $_POST["id"];
       require_once('konfiguration.php');
       $pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
       $statement = $pdo->prepare("SELECT * FROM allechallenges WHERE Prime=:id");
       $result = $statement->execute(array('id' => $id));
       $answr = $statement->fetch();

       $statement = $pdo->prepare("SELECT * FROM aktzeptiertechallenges WHERE Name = :username AND ID=:id");
       $result = $statement->execute(array('username' => $_SESSION['username'], 'id' => $id));
       $respo = $statement->fetch();
       $restzeit = ($respo['endeUT'] - $respo['startUT']) / 60 / 60 / 24;

       if ($respo !== false) {
         echo '{"titel":"' . $answr['Titel'] . '",
         "kathegorie":"' . $answr['Kathegorie'] . '",
         "kurz":"' . $answr['Kurz'] . '",
         "dauer":"' . $answr['Dauer'] . '",
         "zielwert":"' . $answr['Zielwert'] . '",
         "wert":"' . $respo['Wert'] . '",
         "prozent":"' . $respo['fortschritt'] .  '",
         "protocoll":"' . $respo['protokoll'] . '",
         "restzeit":"' . $restzeit . '",
         "lang":"' . $answr['Lang'] . '"}';
       }
      }
   if($_GET['action'] == "accept"){
       $id = $_POST["id"];
       require_once('konfiguration.php');
       $pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
       $statement = $pdo->prepare("INSERT INTO `aktzeptiertechallenges`(`Name`,`ID`, `fortschritt`, `protokoll`) VALUES ('" . $_SESSION['username'] . "','" . $id . "','0','[]')");
       $result = $statement->execute();
       echo "INSERT INTO `aktzeptiertechallenges`(`Name`,`ID`, `fortschritt`, `protokoll`) VALUES ('" . $_SESSION['username'] . "','" . $id . "','0','[]')";
      }
 }
 ?>
