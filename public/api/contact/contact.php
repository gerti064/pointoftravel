<?php
// File: public/api/contact/contact.php

// --- CORS Setup ---
$allowed_origins = [
    'http://localhost:5173',
    'http://46.101.211.140:5173',
    'http://46.101.211.140'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
file_put_contents('/tmp/origin.log', "CONTACT Origin: $origin\n", FILE_APPEND);

// --- Handle preflight (OPTIONS request) ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
    } else {
        http_response_code(403);
        echo json_encode(["error" => "Origin not allowed"]);
    }
    exit();
}

// --- Validate and apply CORS headers ---
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
} else {
    http_response_code(403);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Origin not allowed"]);
    exit();
}

header("Content-Type: application/json");

// --- Enable error reporting (dev only) ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- Connect to DB ---
$mysqli = new mysqli("localhost", "gerti", "123", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $mysqli->connect_error]);
    exit;
}

// --- Parse input ---
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

// --- Prepare insert ---
$stmt = $mysqli->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $mysqli->error]);
    exit;
}

$stmt->bind_param("sss", $data['name'], $data['email'], $data['message']);

// --- Execute and respond ---
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Message received"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$mysqli->close();
