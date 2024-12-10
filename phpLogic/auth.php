<?php
function isAuthenticated() {
    session_start();
    return isset($_SESSION['user']);
}

function getCurrentUserId() {
    return $_SESSION['user']['id'] ?? null;
}
?>
