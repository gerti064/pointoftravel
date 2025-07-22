<?php
// File: public/api/admin/checkAuth.php

// --- CORS Setup ---
$allowed_origins = [
    'http://localhost:5173',
    'http://46.101.211.140:5173',
    'http://46.101.211.140'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Optional: Log for debugging
file_put_contents('/tmp/origin.log', "Origin: $origin\n", FILE_APPEND);

// --- CORS Headers ---
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
} else {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Origin not allowed"]);
    exit();
}

// --- Preflight (OPTIONS) ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Set JSON Response Header ---
header("Content-Type: application/json");

// --- Include DB Config ---
require_once '../db_config.php';

// --- Start Session ---
session_start();

// --- Check Admin Authentication ---
$isAuthenticated = isset($_SESSION['admin_id']) && intval($_SESSION['admin_id']) > 0;

// --- Response ---
echo json_encode([
    'isAuthenticated' => $isAuthenticated,
    'adminId' => $isAuthenticated ? intval($_SESSION['admin_id']) : null
]);
