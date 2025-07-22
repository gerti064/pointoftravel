<?php
// File: public/api/bookings/get_bookings.php

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
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// --- Handle preflight OPTIONS ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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

$bookings = [];
while ($row = $result->fetch_assoc()) {
    // Decode JSON field (array of kid ages)
    $row['kids_ages'] = json_decode($row['kids_ages'], true);

    // TODO: Convert to camelCase if needed
    $bookings[] = $row;
}

// --- Return response ---
echo json_encode([
    "success" => true,
    "bookings" => $bookings
]);

$mysqli->close();
