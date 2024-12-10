<?php
// $allowed_referer = "https://masterofweddingceremony.com/";

// if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], $allowed_referer) !== 0) {
//     http_response_code(403);
//     echo json_encode(["error" => "Forbidden"]);
//     exit;
// }
$host = 'localhost';
$username = 'root'; 
$password = 'staff_creative_design';
$dbname = 'mentorshipApp';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Type, Authorization");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
