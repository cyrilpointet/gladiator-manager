<?php 
// récupère la valeur 'datas' de l'array $_POST
$datas =$_POST['player'];

$datasDecoded= json_decode($datas);
$name=$datasDecoded->{'name'};
$fileName=$name.".txt";

$monfichier = fopen($fileName, 'a');
fclose($monfichier);

$monfichier = fopen($fileName, 'r+');

fseek($monfichier, 0);
fputs($monfichier, $datas);

fclose($monfichier);

echo $fileName;

?>