<?php
// CORS + error reporting
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
error_reporting(E_ALL);

// DB connection
$mysqli = new mysqli("localhost", "root", "", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data) || empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$stmt = $mysqli->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $data['name'], $data['email'], $data['message']);
$stmt->execute();
echo json_encode(["success" => true]);
$stmt->close();
$mysqli->close();
?>
