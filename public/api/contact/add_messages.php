<?php
// File: public/api/contact/add_messages.php

// --- CORS Setup ---
$allowed_origins = [
    'http://localhost:5173',
    'http://46.101.211.140:5173',
    'http://46.101.211.140'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: http://46.101.211.140");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// --- Handle preflight ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Error reporting (development only) ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- Connect to DB ---
$mysqli = new mysqli("localhost", "gerti", "123", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// --- Read JSON input ---
$data = json_decode(file_get_contents("php://input"), true);

if (
    !is_array($data) ||
    empty($data['name']) ||
    empty($data['email']) ||
    empty($data['message'])
) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid or missing fields"]);
    exit;
}

// --- Insert into DB ---
$stmt = $mysqli->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $mysqli->error]);
    exit;
}

$stmt->bind_param("sss", $data['name'], $data['email'], $data['message']);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Message received"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Insert failed"]);
}

$stmt->close();
$mysqli->close();
