<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
require_once ('konfiguration.php');
$pdo = new PDO('mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATENBANK, MYSQL_BENUTZER,MYSQL_KENNWORT);
if(isset($_GET['action'])){
if($_GET['action'] == "login"){
    $username = $_POST["username"];
    $password = $_POST["password"];

     $statement = $pdo->prepare("SELECT * FROM users WHERE username = :username OR email=':username'");
     $result = $statement->execute(array('username' => $username));
     $user = $statement->fetch();

     //Überprüfung des Passworts
     if ($user !== false) {
       if($user['counter_login'] < 20){
       if(password_verify($password, $user['passwort'])){
       $_SESSION['userid'] = $user['id'];
       $_SESSION['name'] = $user['username'];
       $_SESSION['rank'] = $user['rank'];
   		 $_SESSION['banned'] = $user['banned'];
       if(isset($_POST['staylogedin'])) {
          $identifier = random_string();
          $securitytoken = random_string();
          $insert = $pdo->prepare("INSERT INTO securitytokens (user_id, identifier, securitytoken) VALUES (:user_id, :identifier, :securitytoken)");
          $insert->execute(array('user_id' => $user['id'], 'identifier' => $identifier, 'securitytoken' => sha1($securitytoken)));

          setrawcookie('identifier', null, time()-3600, '/');
          setrawcookie('securitytoken', null, time()-3600, '/');
          setrawcookie('identifier', null, time()-3600, '/tws');
          setrawcookie('securitytoken', null, time()-3600, '/tws');
          setrawcookie('identifier', null, time()-3600, '/tws/tim');
          setrawcookie('securitytoken', null, time()-3600, '/tws/tim');
          setrawcookie("identifier",$identifier,time()+(3600*24*365), "/");
          setrawcookie("securitytoken",$securitytoken,time()+(3600*24*365), "/");
        }
       if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
          $insert = $pdo->prepare("UPDATE users SET counter_login = 0 AND LastIP= :ip WHERE username = :username");
          $insert->execute(array('username' => $username, 'ip' => $ip));
         echo '{"status": "ok", "fullname": "' . $user['vorname'] . ' ' . $user['nachname']  .  '", "email": "' . $user['email']  .  '"}';
       } else {
       echo '{"status": "inv"}';
         $insert = $pdo->prepare("UPDATE users SET counter_login = counter_login + 1 WHERE username = :username");
         $insert->execute(array('username' => $username));
       }
     } else {
       echo '{"status": "tmt"}';;

     }
     }
   }
   if($_GET['action'] == "exists"){
        $username = $_POST["username"];

        $statement = $pdo->prepare("SELECT * FROM users WHERE username = :username OR email=':username'");
        $result = $statement->execute(array('username' => $username));
        $user = $statement->fetch();

        //�berpr�fung des Passworts
        if ($user !== false) {
          echo $user['username'];
        } else {
        echo "nl";
        }
      }


 }

?>
