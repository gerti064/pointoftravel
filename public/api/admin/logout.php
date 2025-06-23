<?php
// File: public/api/admin/logout.php

session_start();

// --- CORS headers ---
header("Access-Control-Allow-Origin: http://localhost:5174"); // match your frontend
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Unset all of the session variables
$_SESSION = [];

// If you want to kill the session entirely, also delete the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Finally, destroy the session
session_destroy();

echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
