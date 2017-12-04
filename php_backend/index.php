<?php 

// récupère la valeur 'player' de l'array $_POST
/*
$savedPlayer =$_POST['player'];
$name = $_POST['name'];
$password=$_POST['password'];
*/
$savedPlayer ='player';
$name = 'Toto';
$password= 's3cr3t';

$fileName='saves.json';
/*
// create file if it doesn't exist
$savesFile = fopen($fileName, 'a');
fclose($savesFile);

// Load datas
$savesFile = fopen($fileName, 'r+');

fseek($savesFile, 0);
$return=fgets($savesFile);
fclose($savesFile);
*/

$return = file_get_contents('saves.json');
$jsonreturn = json_decode($return, true);

foreach ($jsonreturn as $key => $value) {
    if ($key==$name && $value['password']==$password) {
       echo $value;
    } elseif ($key==$name && $value['password']!=$password) {
        echo 'error password';
    } else (condition) {
         $playerToSave= array(
             'name' => $name,
             'password' => $password);
    }
 }
/*
if ($jsonreturn[$name]) {
    echo json_encode($jsonreturn['Toto']);
} else {
    # code...
    echo 'raté';
}

*/

?>