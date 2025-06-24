<?php
// File: public/api/admin/login.php

// --- Debug mode (turn off in production) ---
ini_set('display_errors', 1);
error_reporting(E_ALL);
ob_start(); // buffer output to prevent HTML leaks

// --- Start session ---
session_start();

// --- CORS headers (required for cookies/session to work from frontend) ---
header("Access-Control-Allow-Origin: http://localhost:5174"); // ✅ <-- match React dev port
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// --- Read and decode JSON body ---
$input = json_decode(file_get_contents("php://input"), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

// --- Validate input ---
if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Missing credentials']);
    exit;
}

try {
    // --- Connect to MySQL ---
    $mysqli = new mysqli("localhost", "root", "", "pointoftravel");

    if ($mysqli->connect_error) {
        throw new Exception("Connection failed: " . $mysqli->connect_error);
    }

    // --- Fetch user by username ---
    $stmt = $mysqli->prepare("SELECT id, password FROM admins WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        file_put_contents("debug_log.txt", "Input password: $password\nStored hash: " . $row['password'] . "\n", FILE_APPEND);

        // --- Verify password hash ---
        if (password_verify($password, $row['password'])) {
            $_SESSION['admin_id'] = $row['id'];

            ob_clean(); // optional: clear buffer
            echo json_encode(['success' => true, 'message' => 'Login successful']);
            exit;
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error',
        'error' => $e->getMessage(), // Remove this in production
    ]);
    exit;
}
