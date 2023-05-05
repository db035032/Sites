<?php
session_start();
$url = $_POST['full_url'];
$username = $_POST['username'];
$password = $_POST['password'];
$headers = [
    "Authorization:Basic cG93ZXJjaGFydEBzb2xnbTpwb3dlcmNoYXJ0",
    "Cache-Control: no-cache",
    "Username: ".$username,
    "Password: ".$password
];
// echo "username: ".$username;
//Log the TransID for searching calls
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$server_output = curl_exec($ch);
//echo $server_output;
//echo json_encode($server_output);

if ($server_output === false) {
    // API Return Failure
    echo "fail: ";
    die(curl_error($ch));
} else {
    // API Return Success 
    echo $server_output; 
}
curl_close($ch);