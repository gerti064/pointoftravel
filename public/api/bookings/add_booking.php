<?php
// --- Handle CORS Preflight ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit();
}

// --- Normal CORS Headers ---
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// --- Enable error reporting for debugging ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- Connect to DB ---
$mysqli = new mysqli("localhost", "root", "", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB connection failed: " . $mysqli->connect_error]);
    exit;
}

// --- Read and parse input ---
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
    empty($data['departureLocation']) ||
    empty($data['departureDate']) ||
    !isset($data['numberOfAdults'])
) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

// --- Prepare values ---
$returnDate = $data['returnDate'] ?? null;
$hotel = $data['hotel'] ?? null;
$kids_ages_json = json_encode($data['kidsAges'] ?? []);

// --- Prepare and bind SQL ---
$stmt = $mysqli->prepare("INSERT INTO bookings (
    trip_type, departure_location, departure_date, return_date,
    number_of_adults, number_of_kids, travel_mode, hotel, kids_ages
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $mysqli->error]);
    exit;
}

$stmt->bind_param(
    "ssssiiiss",
    $data['tripType'],
    $data['departureLocation'],
    $data['departureDate'],
    $returnDate,
    $data['numberOfAdults'],
    $data['numberOfKids'],
    $data['travelMode'],
    $hotel,
    $kids_ages_json
);

// --- Execute and return result ---
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB insert failed: " . $stmt->error]);
}

$stmt->close();
$mysqli->close();
?>
