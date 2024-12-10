<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // End preflight request here and send appropriate response
    http_response_code(200);
    exit;
}

try {
    // Ensure the required data is present in POST
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;
    $firstName = $data['firstName'] ?? null;
    $lastName = $data['lastName'] ?? null;
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    // Validate the input
    if (!$id || !$firstName || !$lastName || !$email || !$password) {
        throw new Exception('Missing required fields');
    }

    // Register user
    $response = registerUser($id, $firstName, $lastName, $email, $password);
    
    // Send a success response
    echo json_encode(['message' => $response]);
    
} catch (Exception $e) {
    // Handle error and send a JSON response
    http_response_code(400); // Bad Request
    echo json_encode(['error' => $e->getMessage()]);
}


function registerUser($id, $firstName, $lastName, $email, $password) {
    global $pdo;

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email address.");
    }

    // Check for unique ID and email
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE id = ? OR email = ?");
    $stmt->execute([$id, $email]);
    if ($stmt->fetchColumn() > 0) {
        throw new Exception("ID or Email already exists.");
    }

    // Hash password
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Insert user
    $stmt = $pdo->prepare("INSERT INTO users (id, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$id, $firstName, $lastName, $email, $passwordHash]);

    return "User registered successfully.";
}
?>
