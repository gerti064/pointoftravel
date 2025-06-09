<?php
// Connect to MySQL
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';  // adjust if you have a root password
$dbName = 'pointoftravel';

// Create connection
$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert a new admin user
$username = 'gerti';
$password = '123';
$hash = password_hash($password, PASSWORD_BCRYPT);

// Check if admin already exists
$stmt = $conn->prepare("SELECT id FROM admins WHERE username = ?");
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    // Insert new admin
    $stmt = $conn->prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?)");
    $stmt->bind_param('ss', $username, $hash);
    
    if ($stmt->execute()) {
        echo "Admin user 'gerti' created successfully with password '123'";
    } else {
        echo "Error creating admin user: " . $stmt->error;
    }
} else {
    echo "Admin user 'gerti' already exists";
}

$conn->close();