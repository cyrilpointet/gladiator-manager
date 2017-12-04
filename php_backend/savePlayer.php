<?php 

// récupère la valeur 'player' de l'array $_POST
$savedPlayer =$_POST['player'];
$name = $_POST['name'];
$password=$_POST['password'];

$fileName=$name.$password.".txt";

// create file if it doesn't exist
$savesFile = fopen($fileName, 'a');
fclose($savesFile);

// Load datas
$savesFile = fopen($fileName, 'r+');

fseek($savesFile, 0);
$return=fgets($savesFile);

//test result
if ($return) {
   echo $return;
} else {
    fseek($savesFile, 0);
    fputs($savesFile, $savedPlayer);
    echo 'save ok';
}

fclose($savesFile);

?>