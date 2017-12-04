<?php 

// récupère la valeur 'player' de l'array $_POST
$SavedPlayer =$_POST['saves'];
$SavedPlayerDecoded= json_decode($SavedPlayer);

// read saves and convert to object
$fileName=('saves.json');
$saves = file_get_contents($fileName);
$savesDecoded= json_decode($saves);

// iterate on saves, look for existing player and check password
$loadDone=false;
foreach ($savesDecoded as $playersName => $playersString) {
    $playersDecoded=json_decode($playersString);
    
    if ($playersName == $SavedPlayerDecoded->name && $SavedPlayerDecoded->password==$playersDecoded->password) {
       echo json_encode($playersDecoded) ;
       $loadDone=true;

    } elseif ($playersName == $SavedPlayerDecoded->name && $SavedPlayerDecoded->password!=$playersDecoded->password) {
        echo 'error';
        $loadDone=true;
    }
}

//if !player in saves, add it and overwrite saves.json
if (!$loadDone) {
    $nameToSave=$SavedPlayerDecoded->name;
    $savesDecoded->$nameToSave=$SavedPlayer;
    $saves =json_encode($savesDecoded);
    
    $savesFile = fopen($fileName, 'r+');       
    fseek($savesFile, 0);
    fputs($savesFile, $saves);      
    fclose($savesFile);
    
    echo 'save ok';
}

?>