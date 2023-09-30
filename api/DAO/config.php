<?php

function conexaoPDO() {
    return new PDO( 'mysql:dbname=saveur;host=localhost;', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ] );
}

?>
