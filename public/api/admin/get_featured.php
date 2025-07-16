<?php
// File: public/api/get_featured.php

// --- Allow both local and live frontend origins ---
$allowed_origins = ['http://localhost:5173', 'http://46.101.211.140'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: http://46.101.211.140"); // fallback
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// --- Handle preflight OPTIONS requests ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- DB connection ---
require_once '../db_config.php';

// --- Query DB ---
$sql = "SELECT * FROM featured_items";
$result = $conn->query($sql);

$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

// --- Response ---
echo json_encode(['success' => true, 'items' => $items]);
