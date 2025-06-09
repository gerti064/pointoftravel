<?php
// Add these lines at the top for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log incoming requests to a file for debugging
file_put_contents('login_debug.log', date('Y-m-d H:i:s') . ' - Request: ' . file_get_contents('php://input') . PHP_EOL, FILE_APPEND);

header('Content-Type: application/json');
session_start();

// 1) Read JSON payload from React
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username'], $input['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing username or password']);
    exit;
}

$username = $input['username'];
$password = $input['password'];

// 2) Connect to MySQL with correct credentials
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';            // adjust if you have a root‐password
$dbName = 'pointoftravel';

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_errno) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// 3) Prepare+execute query to find that username
$stmt = $conn->prepare("SELECT id, password_hash FROM admins WHERE username = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
    exit;
}
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($adminId, $storedHash);

if ($stmt->fetch()) {
    // 4) We found a row: verify the password
    if (password_verify($password, $storedHash)) {
        // 5) Password is correct: set session and return success
        $_SESSION['admin_id'] = $adminId;
        echo json_encode(['success' => true, 'message' => 'Logged in successfully']);
    } else {
        // Wrong password
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
} else {
    // No such username
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}

$stmt->close();
$conn->close();
