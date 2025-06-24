<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include DB connection
require_once '../db_config.php';

// Set response type
header('Content-Type: application/json');

// Decode incoming JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validate data
if (!isset($data['items']) || !is_array($data['items'])) {
    echo json_encode(['success' => false, 'message' => 'No items array provided']);
    exit;
}

// Prepare statement
$stmt = $conn->prepare("UPDATE featured_items SET text = ?, image = ? WHERE id = ?");
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
    exit;
}

// Update each item
foreach ($data['items'] as $item) {
    if (!isset($item['id'], $item['text'], $item['image'])) {
        continue; // Skip invalid entries
    }
    $stmt->bind_param("ssi", $item['text'], $item['image'], $item['id']);
    $stmt->execute();
}

// Success response
echo json_encode(['success' => true]);
?>
