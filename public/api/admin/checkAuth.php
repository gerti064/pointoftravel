<?php
// File: public/api/admin/checkAuth.php

// --- Allowed origins ---
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

// --- Handle preflight ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Include DB config in case future logic requires DB
require_once '../db_config.php';

// --- Start session ---
session_start();

// --- Check if admin is authenticated ---
$isAuthenticated = isset($_SESSION['admin_id']) && intval($_SESSION['admin_id']) > 0;

// --- Return response ---
echo json_encode([
    'isAuthenticated' => $isAuthenticated,
    'adminId' => $isAuthenticated ? intval($_SESSION['admin_id']) : null
]);
