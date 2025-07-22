<?php
// File: public/api/admin/checkAuth.php

// --- CORS Setup ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';

// Temporarily log the origin for debugging (optional)
file_put_contents('/tmp/origin.log', "Origin: " . $origin . "\n", FILE_APPEND);

// Reflect the origin dynamically (to avoid CORS mismatch)
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// --- Handle preflight ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Include DB config (if needed later) ---
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
