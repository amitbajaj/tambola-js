<?php
//FILE USED BY ALL OTHER PHP PAGES WHICH ACCESS THE DATABASE
$server='hostname'; //PLACEHOLDER FOR HOST NAME/IP FOR DB SERVER
$dbuser='userid'; //PLACEHOLDER FOR USERID TO CONNECT TO THE DB
$dbpass='password'; //PLACEHOLDER FOR PASSWORD FOR USERID TO CONNECT TO THE DB
$dbname='database_name'; //PLACEHOLDER FOR THE NAME OF THE DATABASE TO CONNECT TO
$conn = new mysqli($server, $dbuser, $dbpass,$dbname);
$isconnected=true;
if ($conn->connect_error) {
    error_log($conn->connect_error);
    $isconnected=false;
}
?>