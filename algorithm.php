<?php
require_once('konfiguration.php');
$pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
$unoptimal = "";
$sql = "SELECT * FROM smarthome;";
$users = $pdo->query($sql);
foreach ($users as $row) {
  $prozentp = (($row['Positive'] * 100) / ($row['Positive'] + $row['Negative']));
  if($prozentp < 90){
    $unoptimal .= $row['Item'] . ", " . $row['Kathegory'] . "<br>";
  }
}
if(strlen($unoptimal) > 0){
  $insert = "INSERT INTO `allechallenges`(`Kathegorie`, `Titel`, `Kurz`, `Lang`, `Aktion`, `belohnung`, `Dauer`, `DauerUT`, `Zielwert`)
  VALUES ('living','Optimise running time','Some of your smarthome devices have unfavorable running times.','These Devices run at while your at work:
    <br>" . $unoptimal . "','Einmalig','20','Einmalig','0','1')";
  $statement = $pdo->prepare("SELECT * FROM allechallenges WHERE Titel = 'Optimise running time'");
  $result = $statement->execute();
  $antwrt = $statement->fetch();
  if (strlen($antwrt['Titel']) < 6) {
  echo $insert;
    $statement = $pdo->prepare($insert);
    $result = $statement->execute();
    $antwrt = $statement->fetch();
  }
}



 ?>
