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
    $name = $data['name'] ?? null;
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    // Validate the input
    if (!$id || !$name || !$email || !$password) {
        throw new Exception('Missing required fields');
    }

    // Call the function to log in the user
    $response = loginUser($name, $email, $id, $password);
    
    // Send a success response with the message and token
    echo json_encode(['message' => $response['message'], 'token' => $response['token']]);
    
} catch (Exception $e) {
    // Handle error and send a JSON response
    http_response_code(400); // Bad Request
    echo json_encode(['error' => $e->getMessage()]);
}

// Function to log in a user
function loginUser($name, $email, $id, $password) {
    global $pdo;

    // Fetch user by ID, name (concatenated), and email
    $stmt = $pdo->prepare("SELECT id, first_name, last_name, password_hash, is_active FROM users WHERE id = ? AND email = ? AND CONCAT(first_name, ' ', last_name) = ?");
    $stmt->execute([$id, $email, $name]);
    $user = $stmt->fetch();

    if (!$user) {
        throw new Exception("Invalid credentials. Please check your name, email, ID, or password.");
    }

    // Check if the account is active
    if (!$user['is_active']) {
        throw new Exception("Your account has been deactivated. Contact support.");
    }

    // Verify password
    if (!password_verify($password, $user['password_hash'])) {
        throw new Exception("Invalid credentials. Please check your name, email, ID, or password.");
    }

    // Generate a JWT or session token (simplified example with sessions)
    session_start();
    $token = bin2hex(random_bytes(32)); // Example simple token (use JWT for production)
    $_SESSION['user'] = [
        'id' => $user['id'],
        'name' => $name,
        'token' => $token,
    ];

    return [
        'message' => "Login successful.",
        'token' => $token,
    ];
}
?>
