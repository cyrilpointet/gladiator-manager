<?php 

// récupère la valeur 'player' de l'array $_POST
$SavedPlayer =$_POST['saves'];
$SavedPlayerDecoded= json_decode($SavedPlayer);


$fileName=($SavedPlayerDecoded->name.'.json');
$saveFile = fopen($fileName, 'a');
fclose($saveFile);



// read saves and convert to object
$saveFileContaint = file_get_contents($fileName);
$saveFileContaintDecoded = json_decode($saveFileContaint) ;

if ($saveFileContaint!="") {
    if ($saveFileContaintDecoded->password == $SavedPlayerDecoded->password) {
        echo $saveFileContaint;
    } else {
        echo 'error';
    }
} else {
    $saveFile = fopen($fileName, 'r+');       
    fseek($saveFile, 0);
    fputs($saveFile, $SavedPlayer);      
    fclose($saveFile);
    echo 'save ok';
}

?>