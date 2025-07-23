<?php
// File: public/api/admin/checkAuth.php

$allowed_origins = [
    'http://localhost:5173',
    'http://46.101.211.140:5173',
    'http://46.101.211.140'
];

// fallback to allow if no origin (e.g., direct browser call)
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;

if ($origin === null) {
    // Allow when accessed directly (no origin header)
    $origin = 'http://46.101.211.140';
}

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
} else {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Origin not allowed", "received" => $origin]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

require_once '../db_config.php';

session_start();

$isAuthenticated = isset($_SESSION['admin_id']) && intval($_SESSION['admin_id']) > 0;

echo json_encode([
    'isAuthenticated' => $isAuthenticated,
    'adminId' => $isAuthenticated ? intval($_SESSION['admin_id']) : null
]);
