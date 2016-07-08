<?php

	//recaptcha verification
	require __DIR__.'/vendor/autoload.php';

	$secret = "6LeghSQTAAAAAEi8GyJ0YQXA4rIGDT7M6tVnIBYw";
	$recaptcha = new \ReCaptcha\ReCaptcha($secret);
	$captchaResponse = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);


	//Get form data and mail it to recepient
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		//get values from form and trim for easy data transmission
		$name = strip_tags(trim($_POST["name"]));
		$name = str_replace(array("\r", "\n"), array(" ", " "), $name);
		$address = strip_tags(trim($_POST["address"]));
		$phone = strip_tags(trim($_POST["phone"]));
		$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
		$interest = $_POST["interest"];

		if($captchaResponse !=null && $captchaResponse->isSuccess()){
			if( empty($name) OR empty($address) OR empty($phone) or !filter_var($email, FILTER_VALIDATE_EMAIL)){
				//Return 400 and exit
				http_response_code(400);
				echo "Oops! There was a problem with your submission. Please complete the form and try again.";
				exit;
			}

			//Recipient Email
			$recipient = "andre@looking.la";
			$subject = "New contact from $name";

			$email_content = "Name: $name\n Address: $address\n Phone: $phone\n Email: $email\n Interest: $interest";

			$email_headers = "From: $name <$email>";

			if(mail($recipient, $subject, $email_content, $email_headers)) {
				//return 200 and positive response
				http_response_code(200);
				echo "Thank You $name! Your message has been sent.";
			} else {
				//Set 500 and try again
				http_response_code(500);
				echo "Oops! Something went wrong with your message. Please complete the form and try again.";
			}
		} else {
			http_response_code(403);
			echo "Oops! Something went wrong with your message. Please complete the form and try again.";
		}
	} else {
		//If not POST request, return 403 and try again
		http_response_code(403);
		echo "There was a problem with your submission, please try again.";
	}

?>
