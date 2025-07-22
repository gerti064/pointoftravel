<?php
// File: public/api/update_featured.php

// --- Enable error reporting (disable in production) ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
    header("Access-Control-Allow-Origin: http://46.101.211.140"); // fallback
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// --- Handle preflight request ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Include DB connection ---
require_once '../db_config.php';

// --- Decode JSON input ---
$data = json_decode(file_get_contents("php://input"), true);

// --- Validate input structure ---
if (!isset($data['items']) || !is_array($data['items'])) {
    echo json_encode([
        'success' => false,
        'message' => 'No items array provided'
    ]);
    exit;
}

// --- Prepare SQL update statement ---
$stmt = $conn->prepare("UPDATE featured_items SET text = ?, image = ? WHERE id = ?");
if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Prepare failed: ' . $conn->error
    ]);
    exit;
}

// --- Loop through and update each item ---
foreach ($data['items'] as $item) {
    if (!isset($item['id'], $item['text'], $item['image'])) {
        continue; // skip incomplete
    }
    $stmt->bind_param("ssi", $item['text'], $item['image'], $item['id']);
    $stmt->execute();
}

$stmt->close();

// --- Success response ---
echo json_encode(['success' => true]);
