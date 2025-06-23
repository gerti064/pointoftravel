<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle OPTIONS preflight requests for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$mysqli = new mysqli("localhost", "root", "", "pointoftravel");
if ($mysqli->connect_errno) {
    echo json_encode(["success" => false, "message" => "Failed to connect to DB"]);
    exit;
}

$result = $mysqli->query("SELECT * FROM bookings ORDER BY created_at DESC");

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $row['kids_ages'] = json_decode($row['kids_ages'], true);
    $bookings[] = $row;
}

echo json_encode(["success" => true, "bookings" => $bookings]);

$mysqli->close();
