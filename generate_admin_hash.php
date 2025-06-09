<?php
// generate_admin_hash.php

// Change this to whatever plaintext password you want to hash:
$plaintext = 'pointoftravel123';

// Generate a bcrypt hash:
$hash = password_hash($plaintext, PASSWORD_BCRYPT);

// Output it so you can copy it:
echo $hash . PHP_EOL;
