<?php
require 'db.php';

// Define upload directory
$uploadDirectory = '/var/www/html/mentorship/videos/'; // Adjust this to your server's setup

// Ensure the upload directory exists and is writable
if (!is_dir($uploadDirectory)) {
    if (!mkdir($uploadDirectory, 0777, true)) {
        echo json_encode(['error' => 'Failed to create upload directory']);
        exit;
    }
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST fields
    $title = isset($_POST['title']) ? trim($_POST['title']) : '';
    $description = isset($_POST['description']) ? trim($_POST['description']) : '';

    // Validate required fields
    if (empty($title) || empty($description) || !isset($_FILES['video'])) {
        echo json_encode(['error' => 'Title, description, and video file are required']);
        exit;
    }

    // Validate the uploaded file
    $file = $_FILES['video'];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['error' => 'File upload error: ' . $file['error']]);
        exit;
    }

    // Validate file size (e.g., max 50MB)
    $maxFileSize = 50000 * 1024 * 1024; // 50MB

    if ($file['size'] > $maxFileSize) {
        echo json_encode(['error' => 'File size exceeds the maximum allowed size of 50MB']);
        exit;
    }

    // Validate file type (e.g., allow only mp4, avi)
    $allowedExtensions = ['mp4', 'avi', 'mkv', 'mov'];
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($fileExtension, $allowedExtensions)) {
        echo json_encode(['error' => 'Invalid file type. Allowed types are: ' . implode(', ', $allowedExtensions)]);
        exit;
    }

    // Generate a unique file name
    $newFileName = uniqid('video_', true) . '.' . $fileExtension;
    $fileDestination = $uploadDirectory . $newFileName;

    // Move the uploaded file
    if (!move_uploaded_file($file['tmp_name'], $fileDestination)) {
        echo json_encode(['error' => 'Failed to save the uploaded file']);
        exit;
    }

    // Insert into the database
    try {
        $query = "INSERT INTO videos (title, description, file_path) VALUES (:title, :description, :file_path)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':file_path', $newFileName); // Save only the file name

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Video uploaded successfully']);
        } else {
            echo json_encode(['error' => 'Failed to save video details in the database']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request. Please use POST method with a video file.']);
}
?>
