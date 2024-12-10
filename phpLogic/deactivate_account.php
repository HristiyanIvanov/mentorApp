<?php
require 'account_management.php';
require 'auth.php';

header('Content-Type: application/json');

// Ensure admin user
if (!isAuthenticated() || getCurrentUserId() !== 'admin_id') {
    http_response_code(403);
    echo json_encode(['message' => 'Unauthorized']);
    exit;
}

try {
    deactivateExpiredAccounts();
    echo json_encode(['message' => 'Expired accounts deactivated successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to deactivate accounts', 'error' => $e->getMessage()]);
}
?>
