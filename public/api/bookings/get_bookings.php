<?php
// --- Set CORS Headers ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// --- Handle CORS Preflight ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Connect to the database ---
$mysqli = new mysqli("localhost", "root", "", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to connect to DB"]);
    exit();
}

// --- Query bookings ---
$result = $mysqli->query("SELECT * FROM bookings ORDER BY created_at DESC");

$bookings = [];
while ($row = $result->fetch_assoc()) {
    // Decode JSON-encoded kids_ages
    $row['kids_ages'] = json_decode($row['kids_ages'], true);

    // Rename fields to camelCase (optional, for frontend compatibility)

    // Remove original snake_case fields if not needed

    $bookings[] = $row;
}

// --- Return JSON response ---
echo json_encode(["success" => true, "bookings" => $bookings]);

$mysqli->close();
?>
