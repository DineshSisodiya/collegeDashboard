<?php
/*
  variable meaning
	ei - engagement insight
	fi - follower insight
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

error_reporting(0);

// include database and object files
require_once '../config/DBconfig.php';
require_once '../modules/dataLoader.php';

// database connection
$DB=new DBconfig();
$con=$DB->connect();

$dLoader=new dataLoader($con);


function dateConvert($date)
{
	//convert dates to sql compatible date-time format
	$date_parts=explode('-',$date);
	return $date_parts[2].'-'.$date_parts[1].'-'.$date_parts[0].' 00:00:00';
}

// get posted data obj
$input = json_decode(file_get_contents("php://input"));
$output->success=false;
$output->message=null;

if( empty($input->from) && 
	empty($input->to) ) {
	$output->message='Incorrect time period';
} 
else if(empty($input->clgId)) {
	$output->message='collegeId not specified';
}
else {

	/* condition to check if date format is correct or not */

	// convert date
	$input->from=dateConvert($input->from);
	$input->to=dateConvert($input->to);

	empty($input->allItems)==true?1:0;
	
	if($input->allItems==1) {
		//fetch both fi & ei data
		$output->data=$dLoader->loadFullData($input->Gtype,$input->from,$input->to,$input->clgId);
	} 
	else {
		$output->data=$dLoader->getGraphData($input->Gtype,$input->from,$input->to,$input->clgId);
	}
}

echo json_encode($output);

?>