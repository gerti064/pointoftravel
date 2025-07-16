<?php
// File: public/api/db_config.php

// Detect environment
$hostName = $_SERVER['SERVER_NAME'] ?? 'localhost';

// Default to production credentials
$db_host = "localhost";
$db_user = "gerti";
$db_pass = "123";
$db_name = "pointoftravel";

// If running locally, override credentials
if (in_array($hostName, ['localhost', '127.0.0.1'])) {
    $db_user = "root";
    $db_pass = "";
}

// Connect to MySQL
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Handle errors
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}
?>
