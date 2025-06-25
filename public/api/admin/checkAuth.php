<?php
// File: public/api/admin/checkAuth.php
session_start();

// --- CORS headers ---
header('Access-Control-Allow-Origin: http://localhost:5173'); // ✅ make sure this matches your React dev server
header('Access-Control-Allow-Credentials: true'); // ✅ to allow session cookie
header('Content-Type: application/json');

// Check if admin is logged in
$isAuthenticated = isset($_SESSION['admin_id']) && intval($_SESSION['admin_id']) > 0;

// Return JSON
echo json_encode([
    'isAuthenticated' => $isAuthenticated,
    'adminId' => $isAuthenticated ? intval($_SESSION['admin_id']) : null
]);
