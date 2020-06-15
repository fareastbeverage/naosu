<?php
/*Database credentials - run on mySql with user set as 'root'*/
session_start();

//set timezone
//date_default_timezone_set('Malaysia');

//database credentials
define('DB_HOST','localhost');
define('DB_USER','*_naosu');
define('DB_PASSWORD','');
define('DB_NAME','*_naosu');

//application address
//define('DIR','http://domain.com/');
//define('SITEEMAIL','noreply@domain.com');

/*connect to mySql server*/
try {
    $conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASSWORD);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
	// show error
    echo "<script type='text/javascript'>alert('Connection failed: " . $e->getMessage() . "');</script>";
    exit;
    }

//include('classes/phpmailer/mail.php');
//$user = new USER($conn);

?>
