<?php
// File: public/api/bookings/get_bookings.php

// --- CORS Setup ---
$allowed_origins = [
    'http://localhost:5173',
    'http://46.101.211.140:5173',
    'http://46.101.211.140'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
file_put_contents('/tmp/origin.log', "GET_BOOKINGS Origin: $origin\n", FILE_APPEND);

// --- Handle preflight OPTIONS ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
    } else {
        http_response_code(403);
        echo json_encode(["error" => "Origin not allowed"]);
    }
    exit();
}

// --- Validate and apply CORS headers ---
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
} else {
    http_response_code(403);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Origin not allowed"]);
    exit();
}

header("Content-Type: application/json");

// --- Connect to DB ---
$mysqli = new mysqli("localhost", "gerti", "123", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to connect to DB: " . $mysqli->connect_error
    ]);
    exit;
}

// --- Fetch bookings ---
$result = $mysqli->query("SELECT * FROM bookings ORDER BY created_at DESC");
if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Query failed: " . $mysqli->error
    ]);
    $mysqli->close();
    exit;
}

$bookings = [];
while ($row = $result->fetch_assoc()) {
    // Decode JSON field
    $row['kids_ages'] = json_decode($row['kids_ages'], true);
    $bookings[] = $row;
}

// --- Return response ---
echo json_encode([
    "success" => true,
    "bookings" => $bookings
]);

$mysqli->close();
