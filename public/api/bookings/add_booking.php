<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$mysqli = new mysqli("localhost", "root", "", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

// Read input
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON"]);
    exit;
}

// Validate required fields (you can add more validation)
if (empty($data['tripType']) || empty($data['departureLocation']) || empty($data['departureDate']) || !isset($data['numberOfAdults'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

// Prepare and bind
$stmt = $mysqli->prepare("INSERT INTO bookings (trip_type, departure_location, departure_date, return_date, number_of_adults, number_of_kids, travel_mode, hotel, kids_ages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$kids_ages_json = json_encode($data['kidsAges'] ?? []);
$stmt->bind_param(
    "ssssiiiss",
    $data['tripType'],
    $data['departureLocation'],
    $data['departureDate'],
    $data['returnDate'],
    $data['numberOfAdults'],
    $data['numberOfKids'],
    $data['travelMode'],
    $data['hotel'],
    $kids_ages_json
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB insert failed"]);
}

$stmt->close();
$mysqli->close();
?>
