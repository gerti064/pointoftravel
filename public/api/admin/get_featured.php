<?php
// File: public/api/get_featured.php

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
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// --- Handle preflight ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- DB connection ---
require_once '../db_config.php';

// --- Query DB ---
$sql = "SELECT * FROM featured_items";
$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database query failed',
        'error' => $conn->error
    ]);
    exit;
}

$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

// --- Respond ---
echo json_encode([
    'success' => true,
    'items' => $items
]);
