<?php 

// récupère la valeur 'player' de l'array $_POST
$datas =$_POST['player'];
$name = $_POST['name'];
$password=$_POST['password'];

$datasDecoded= json_decode($datas);
$savedPlayer=$datasDecoded->{'player'};
$fileName=$name.$password.".txt";

// create file if it doesn't exist
$savesFile = fopen($fileName, 'a');
fclose($savesFile);

// Load datas
$savesFile = fopen($fileName, 'r+');

fseek($savesFile, 0);
$return=fgets($savesFile);

//test result
if ($return=='') {
   echo $return;
} else {
    fseek($savesFile, 0);
    fputs($savedPlayer);
    echo 'save ok';
}

fclose($savesFile);

?>