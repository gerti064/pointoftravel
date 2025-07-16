<?php
// File: public/api/admin/uploadImage.php

// --- CORS setup for local and live ---
$allowed_origins = ['http://localhost:5173', 'http://46.101.211.140'];
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

// --- Ensure upload directory exists ---
$uploadDir = __DIR__ . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// --- Handle image upload ---
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $file = $_FILES['image'];
    $fileName = basename($file['name']);
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Return full URL based on server IP or domain
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
        $host = $_SERVER['HTTP_HOST'];
        $publicUrl = "$protocol://$host/api/admin/uploads/" . $fileName;

        echo json_encode(['success' => true, 'url' => $publicUrl]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Upload failed']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No file received']);
}
