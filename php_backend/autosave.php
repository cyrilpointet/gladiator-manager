<?php 

// récupère la valeur 'player' de l'array $_POST
$SavedPlayer =$_POST['saves'];
$SavedPlayerDecoded= json_decode($SavedPlayer);
$fileName=($SavedPlayerDecoded->name.'.json');

$saveFile = fopen($fileName, 'r+');
ftruncate($saveFile,0);       
fseek($saveFile, 0);
fputs($saveFile, $SavedPlayer);      
fclose($saveFile);
echo 'saveok';


?>