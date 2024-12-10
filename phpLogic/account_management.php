<?php
function deactivateExpiredAccounts() {
    global $pdo;

    $stmt = $pdo->prepare("UPDATE users SET is_active = FALSE, deactivation_date = NOW() WHERE is_active = TRUE AND DATEDIFF(NOW(), deactivation_date) >= 28");
    $stmt->execute();
}
?>
