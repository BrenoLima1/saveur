<?php
function iniciarSessao()
{
    session_start();
    session_regenerate_id(true);
    $_SESSION['loggedin'] = true;
}

function destruirSessao(){
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_start();
        $_SESSION['loggedin'] = false;
        session_destroy();
    }
}
