<?php
// File: public/api/admin/checkAuth.php

// --- CORS Setup ---
$allowed_origins = [
    'http://localhost:5173',
    'http://46.101.211.140:5173',
    'http://46.101.211.140'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
file_put_contents('/tmp/origin.log', "Origin: $origin\n", FILE_APPEND);

// Only allow matching origin
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
} else {
    // Reject if origin is not in the list
    http_response_code(403);
    echo json_encode(["error" => "Origin not allowed"]);
    exit();
}

header("Content-Type: application/json");

// --- Handle preflight ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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
