<?php 

// récupère la valeur 'player' de l'array $_POST
$datas =$_POST['player'];
$password=$_POST['password'];

$datasDecoded= json_decode($datas);
$name=$datasDecoded->{'name'};
$fileName=$name.$password.".txt";

$monfichier = fopen($fileName, 'a');
fclose($monfichier);

$monfichier = fopen($fileName, 'r+');

fseek($monfichier, 0);
fputs($monfichier, $datas);

fclose($monfichier);

/*
// access database

try
{
    $bdd = new PDO('mysql:host=localhost;dbname=gladiatorsaves;charset=utf8', 'root', '');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}
*/
echo $fileName;

?>