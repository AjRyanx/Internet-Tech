<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'includes/members_data.php';

echo "Total Members: " . count($members) . "\n";
echo "Last Member: " . $members[count($members) - 1]['name'] . "\n";
?>
