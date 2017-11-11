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
         "id":"' . $respo['ID'] . '",
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
    if($_GET['action'] == "abhaken"){
    require_once('konfiguration.php');
      $id = $_POST["id"];

      $pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
      $statement = $pdo->prepare("SELECT * FROM aktzeptiertechallenges WHERE ID= :id");
      $statement->execute(array('id' => $id));
      $row = $statement->fetch();
      $wertneu = $row['Wert'] + 1;
      $gfeedback = $wertneu . ". Approved on the " . date("d.m.Y - H:i");
      echo $gfeedback;
      $json = str_replace('\'','"',$row['protokoll']);
      if(strlen($gfeedback) > 0){
        $arr = json_decode($json, true);
        $beinhaltet = false;
        array_push($arr, $gfeedback);
        var_dump($arr);
        $json = json_encode($arr);
        $json =  str_replace("\"", '\'', str_replace("\"", '\'', $json));
        $insert = $pdo->prepare("UPDATE aktzeptiertechallenges SET protokoll= :protokoll, Wert= :wert, fortschritt= :fortschritt WHERE ID= :id");
        $insert->execute(array('protokoll' => $json, 'id' => $id, 'wert' => $wertneu, 'fortschritt' => $wertneu * 25));
      }
    }
 }
 ?>
