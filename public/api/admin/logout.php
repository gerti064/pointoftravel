<?php
// File: public/api/admin/logout.php

// --- CORS Setup ---
$allowed_origins = [
    'http://localhost:5173',
    'http://46.101.211.140:5173',
    'http://46.101.211.140'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
file_put_contents('/tmp/origin.log', "LOGOUT Origin: $origin\n", FILE_APPEND);

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
    } else {
        http_response_code(403);
        echo json_encode(["error" => "Origin not allowed"]);
    }
    exit();
}

// Only allow matching origins
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
} else {
    http_response_code(403);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Origin not allowed"]);
    exit();
}

header("Content-Type: application/json");

// --- Start session ---
session_start();

// --- Clear session data ---
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

// --- Fully destroy session ---
session_destroy();

// --- Respond ---
echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully'
]);
