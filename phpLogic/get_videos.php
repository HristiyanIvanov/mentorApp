<?php
// Include database connection
require 'db.php';

function getVideos() {
    global $pdo;

    // Fetch videos from the database
    $stmt = $pdo->prepare("SELECT id, title, description, file_path, uploaded_at FROM videos");
    $stmt->execute();
    return $stmt->fetchAll();
}

// Get video data
$videos = getVideos();

$baseUrl = "http://93.123.16.182/mentorship/videos/";

foreach ($videos as &$video) {
    $video['video_url'] = $baseUrl . $video['file_path'];
}

// Return video data as JSON
echo json_encode($videos);
?>
