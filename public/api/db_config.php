<?php
// File: public/api/db_config.php

// --- Enable error reporting (for development only, remove in production) ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- Detect environment ---
$hostName = $_SERVER['SERVER_NAME'] ?? 'localhost';

// --- Default production DB credentials ---
$db_host = "localhost";
$db_user = "gerti";
$db_pass = "123";
$db_name = "pointoftravel";

// --- Override for local development ---
if (in_array($hostName, ['localhost', '127.0.0.1'])) {
    $db_user = "root";
    $db_pass = "";
}

// --- Create connection ---
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// --- Handle connection error ---
if ($conn->connect_error) {
    // Set response type if used in an API context
    if (!headers_sent()) {
        header("Content-Type: application/json");
    }

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}
?>
