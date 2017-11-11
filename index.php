<html>
<head>
<link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
<link href="./design.css" rel="stylesheet">
<meta name="viewport" content="width=430">
  </head>
<body style="margin-bottom: 0px">
  <?php
$colorcode = "#2554C7";
//echo '<style>div.bf_002 {background-color: ' . $colorcode . ';}div.fly_h_001 {background-color: ' . $colorcode . ';}div.fly_bf_002 {background-color: ' . $colorcode . ';}div.f_001 a.selected {color: ' . $colorcode . ';}div.h_001 {background-color: ' . $colorcode . ';}</style>';

   ?>
<div class="fly_001" id="fly_001" onclick="fly_001_visible(false)"></div>
<div class="fly_000" id="fly_000"></div>

<div class="h_001">
  <h1>Inprovr</h1>
</div>
<div class="c_003">
<ul>
<a href="./profile.php"><li style="background-image: url('profile.jpg');">
  <h1 style="text-align: right;">Profile</h1>
</li></a>
<a href="./friends.php"><li style="background-color: blue; background-image: url('friends.jpg')">
  <h1>Friends</h1>
</li></a>
<a href="./challenges.php"><li style="background-color: green; width: 100%; background-image: url('challenge.jpg')">
  <h1  style="text-align: center;">Challenges</h1>
</li></a>
</div>
</ul>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="./windows.js"></script>
</body>
</html>
