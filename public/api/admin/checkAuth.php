<?php
// File: public/api/admin/checkAuth.php

// --- CORS Setup ---
$allowed_origins = [
    'http://localhost:5173',
    'http://46.101.211.140:5173',
    'http://46.101.211.140'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Log origin for debugging
file_put_contents('/tmp/origin.log', "Origin: $origin\n", FILE_APPEND);

// --- Handle preflight (OPTIONS request) early ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    } else {
        http_response_code(403);
        echo json_encode(["error" => "Origin not allowed"]);
    }
    exit();
}

// --- Validate origin before sending headers ---
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
} else {
    http_response_code(403);
    echo json_encode(["error" => "Origin not allowed"]);
    exit();
}

header("Content-Type: application/json");

// --- Include DB config ---
require_once '../db_config.php';

// --- Start session ---
session_start();

// --- Check admin authentication ---
$isAuthenticated = isset($_SESSION['admin_id']) && intval($_SESSION['admin_id']) > 0;

// --- Respond with auth status ---
echo json_encode([
    'isAuthenticated' => $isAuthenticated,
    'adminId' => $isAuthenticated ? intval($_SESSION['admin_id']) : null
]);
