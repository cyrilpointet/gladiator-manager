<?php 
// récupère la valeur 'datas' de l'array $_POST
$name =$_POST['name'];
$password=$_POST['password'];
$fileName=$name.$password.".txt";


$monfichier = fopen($fileName, 'r+');

fseek($monfichier, 0);
$return=fgets($monfichier);

fclose($monfichier);

echo $return;

?>