<?php
if(!$_SESSION){session_start();}
// echo phpinfo();
//Server Details
$dbstr ="(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST =ipsoldb3.ip.devcerner.net)(PORT = 1521))
(CONNECT_DATA =
(SERVER = DEDICATED)
(SERVICE_NAME = ssolgm)
(INSTANCE_NAME = world)))";
$host = "v500/v500@//ipsoldb3.ip.devcerner.net:1521/ssolgm.world";
$user = 'v500';
$password = 'v500';
$db = "oversite";
// Create connection to Oracle
$conn = oci_connect($user,$password,$dbstr);
if (!$conn) {
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
   return $conn;
}
else {
   print "Connected to Oracle!";
}
// Close the Oracle connection
// oci_close($conn);


// $conn = mysqli_connect($host, $user, $password,$db);
// Check connection
// if (!$conn) {
//   die("Connection failed: " . mysqli_connect_error());
// }