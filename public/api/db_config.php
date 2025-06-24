<?php
$host = "localhost";          // or 127.0.0.1
$username = "root";           // change if needed
$password = "";               // your MySQL password
$database = "pointoftravel";  // your DB name

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
