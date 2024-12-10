<?php
require 'auth.php';

header('Content-Type: application/json');

session_start();
if (isAuthenticated()) {
    echo json_encode(['authenticated' => true, 'userId' => getCurrentUserId()]);
} else {
    echo json_encode(['authenticated' => false]);
}
?>
