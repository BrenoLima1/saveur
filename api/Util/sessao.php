<?php
function iniciarSessao()
{
    session_name('saveur');
    session_start();
    session_regenerate_id(true);
    $_SESSION['loggedin'] = true;
}

function destruirSessao(){
        session_name('saveur');
        session_start();
        // unset($_SESSION['loggedin']);
        session_destroy();
}

function verificarSessao(){
    session_name('saveur');
    session_start();
    if (session_status() === PHP_SESSION_ACTIVE) {
        return $_SESSION['loggedin'];
    }
}
