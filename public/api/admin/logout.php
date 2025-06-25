<?php
// File: public/api/admin/logout.php

session_start();

// --- CORS headers ---
header("Access-Control-Allow-Origin: http://localhost:5173"); // Match frontend
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// --- Handle preflight (OPTIONS) ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Unset session variables ---
$_SESSION = [];

// --- Destroy session cookie ---
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// --- Destroy session ---
session_destroy();

// --- Return JSON response ---
echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
