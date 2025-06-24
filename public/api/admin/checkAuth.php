<?php
// File: public/api/admin/checkAuth.php

// Start session to access session variables
session_start();

// --- CORS headers (required for frontend <-> PHP session communication) ---
header('Access-Control-Allow-Origin: http://localhost:5174'); // Frontend origin
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Check if the admin is authenticated
$isAuthenticated = isset($_SESSION['admin_id']) && intval($_SESSION['admin_id']) > 0;

// Return authentication status as JSON
echo json_encode([
    'isAuthenticated' => $isAuthenticated,
    'adminId' => $isAuthenticated ? intval($_SESSION['admin_id']) : null
]);
