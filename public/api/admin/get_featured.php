<?php
require_once '../db_config.php';

header('Content-Type: application/json');

$sql = "SELECT * FROM featured_items";
$result = $conn->query($sql);

$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

echo json_encode(['success' => true, 'items' => $items]);
?>
