<?php
// File: public/api/bookings/add_booking.php

// --- CORS: Allow both local + live frontends ---
$allowed_origins = ['http://localhost:5173', 'http://46.101.211.140:5173','http://46.101.211.140'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: http://46.101.211.140"); // fallback
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// --- Handle preflight request ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Error reporting (disable in production) ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- Connect to DB using admin credentials ---
$mysqli = new mysqli("localhost", "gerti", "123", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB connection failed: " . $mysqli->connect_error]);
    exit;
}

// --- Read and decode JSON input ---
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit;
}

// --- Validate required fields ---
if (
    empty($data['tripType']) ||
    empty($data['from_location']) ||
    empty($data['to_location']) ||
    empty($data['departureDate']) ||
    empty($data['first_name']) ||
    empty($data['last_name']) ||
    !isset($data['numberOfAdults'])
) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

// --- Prepare optional fields ---
$returnDate      = $data['returnDate'] ?? null;
$hotel           = $data['hotel'] ?? null;
$phone           = $data['phone'] ?? null;
$email           = $data['email'] ?? null;
$kidsAgesJson    = json_encode($data['kidsAges'] ?? []);
$numberOfKids    = $data['numberOfKids'] ?? 0;
$travelMode      = $data['travelMode'] ?? null;

// --- Prepare and bind SQL ---
$stmt = $mysqli->prepare("INSERT INTO bookings (
    trip_type, from_location, to_location, departure_date, return_date,
    first_name, last_name, number_of_adults, number_of_kids, travel_mode,
    hotel, phone, email, kids_ages
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $mysqli->error]);
    exit;
}

$stmt->bind_param(
    "sssssssiiissss",
    $data['tripType'],
    $data['from_location'],
    $data['to_location'],
    $data['departureDate'],
    $returnDate,
    $data['first_name'],
    $data['last_name'],
    $data['numberOfAdults'],
    $numberOfKids,
    $travelMode,
    $hotel,
    $phone,
    $email,
    $kidsAgesJson
);

// --- Execute and respond ---
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB insert failed: " . $stmt->error]);
}

$stmt->close();
$mysqli->close();
