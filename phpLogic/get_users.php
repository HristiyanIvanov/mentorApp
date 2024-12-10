<?php
require 'db.php';
function getUsers() {
  
    global $pdo;

    $stmt = $pdo->prepare("SELECT id, first_name, last_name, email, is_active, deactivation_date FROM users");
    $stmt->execute();
    return $stmt->fetchAll();
}
?>
