<?php 
// récupère la valeur 'datas' de l'array $_POST
$fileName =$_POST['filename'];

$monfichier = fopen($fileName, 'r+');

fseek($monfichier, 0);
$return=fgets($monfichier);

fclose($monfichier);

echo $return;

?>