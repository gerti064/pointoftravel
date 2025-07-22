<?php
// File: public/api/admin/login.php

// --- Debug mode (disable in production) ---
ini_set('display_errors', 1);
error_reporting(E_ALL);
ob_start(); // Buffer output to prevent HTML leaks

// --- Start session ---
session_start();

// --- CORS Setup ---
$allowed_origins = [
    'http://localhost:5173',
    'http://46.101.211.140:5173',
    'http://46.101.211.140'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: http://46.101.211.140");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// --- Handle preflight request ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Include DB config ---
require_once '../db_config.php';

// --- Read and decode JSON input ---
$input = json_decode(file_get_contents("php://input"), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

// --- Validate input ---
if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Missing credentials']);
    exit;
}

try {
    if ($conn->connect_error) {
        throw new Exception("DB connection failed: " . $conn->connect_error);
    }

    // --- Prepare and execute user fetch ---
    $stmt = $conn->prepare("SELECT id, password FROM admins WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        // Optional debug log (remove in production)
        // file_put_contents("debug_log.txt", "Input: $password\nStored: " . $row['password'] . "\n", FILE_APPEND);

        if (password_verify($password, $row['password'])) {
            $_SESSION['admin_id'] = $row['id'];
            ob_clean();
            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error',
        'error' => $e->getMessage() // remove in production
    ]);
}
