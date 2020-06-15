<?php

require_once 'config.php';

//retrieve email
$email = trim($_POST['email']);


if($_SERVER["REQUEST_METHOD"] === "POST") {

	// Prepare a select statement
	$sql = "SELECT email FROM subscription_list WHERE email=:email";

	if($stmt = $conn->prepare($sql)){
		// Bind variables to the prepared statement as parameters
		$stmt->bindParam(':email',$email,PDO::PARAM_STR);

		// Attempt to execute the prepare statement
		if($stmt->execute()){
			// Check if email exists, if yes then return error
			if($stmt->rowCount() == 1){
				//return error
				echo "SUBSCRIBED: This email has already been subscribed.";
			} else {
				// Save email into database
				// Prepare a insert into statement
				$sql2 = "INSERT INTO subscription_list (email) VALUES (:email)";
				if($stmt2 = $conn->prepare($sql2)){
			      // Bind variables to the prepared statement as parameters
			      $stmt2->bindParam(':email',$email,PDO::PARAM_STR);

			      // Attempt to execute the prepared statement
			      if ($stmt2->execute()) {

			      	/* TO BE ADDED

			      	Email registration and notification

			      	*/

			      	echo "Thank you for signing up with us!";
					   
					


			      } else {
			      	echo "ERROR: Something went wrong. Please try again later.";
			      }
			    } else{
		    		echo "ERROR: Something went wrong. Please try again later.";
				}
			}
		} else{
    		echo "ERROR: Something went wrong. Please try again later.";
		}
	}

}


// close statement
unset($stmt);
unset($stmt2);

// close connection
unset($conn);



?>