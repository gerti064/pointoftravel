<?php
// File: public/api/contact/get_messages.php

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
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// --- Handle preflight request ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- DB Connection ---
$mysqli = new mysqli("localhost", "gerti", "123", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "DB connection failed: " . $mysqli->connect_error
    ]);
    exit;
}

// --- Query messages ---
$result = $mysqli->query("SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC");

$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

// --- Return JSON response ---
echo json_encode([
    "success" => true,
    "messages" => $messages
]);

$mysqli->close();
