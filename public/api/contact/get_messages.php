<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// --- Enable error reporting ---
ini_set('display_errors', 1);
error_reporting(E_ALL);

// --- Connect to DB ---
$mysqli = new mysqli("localhost", "root", "", "pointoftravel");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

$result = $mysqli->query("SELECT name, email, message, created_at FROM contact_messages ORDER BY created_at DESC");

$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode(["success" => true, "messages" => $messages]);

$mysqli->close();
?>