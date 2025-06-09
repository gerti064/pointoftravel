<?php
// File: public/api/admin/checkAuth.php
header('Content-Type: application/json');
session_start();

// Check if the admin is logged in (session variable set and > 0)
$isAuthenticated = isset($_SESSION['admin_id']) && intval($_SESSION['admin_id']) > 0;

echo json_encode([
    'isAuthenticated' => $isAuthenticated,
    'adminId'         => $isAuthenticated ? intval($_SESSION['admin_id']) : null
]);
