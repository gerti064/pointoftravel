<?php
// --- Handle CORS ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit();
}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// --- Enable error reporting ---
ini_set('display_errors', 1);
error_reporting(E_ALL);

// --- Connect to DB ---
$mysqli = new mysqli("localhost", "root", "", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// --- Parse incoming JSON ---
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid or missing fields"]);
    exit;
}

// --- Insert message into DB ---
$stmt = $mysqli->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $data['name'], $data['email'], $data['message']);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Insert failed"]);
}

$stmt->close();
$mysqli->close();
?>