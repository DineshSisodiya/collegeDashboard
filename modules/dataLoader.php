<?php

/**
* 
*/
class dataLoader
{
	private $con=null;
	function __construct($con)
	{
		$this->con=$con;
	}
	function sanitizeParam($arr)
	{
		$arr_len=count($arr);
		for($i=0;$i<$arr_len;$i++) {
			$arr[$i]=stripslashes($arr[$i]);
			$arr[$i]=filter_var($arr[$i], FILTER_SANITIZE_STRING);
			$arr[$i]=str_replace('--','',$arr[$i]);//prevent query breaking
			$arr[$i]=$this->con->real_escape_string($arr[$i]);
		}
		return $arr;
	}
	// public function reduceSets($graphData) 
	// {
	// 	$size=count($graphData);
	// 	if($size>7) {
	// 		$gap=int($size/7);
	// 	}
	// }
	public function getGraphData($Gtype,$from,$to,$clgId)
	{
		$param_arr=$this->sanitizeParam(array($from,$to));

		$labels=null;

		$table=null;//array();
		$col=null;//array();

		if($Gtype[0]=='fi') {
			switch ($Gtype[1]) {
				case 0:
				    // interested
					$table='user_follow_data';
					$col=array('name'=>'status','value'=>1);
					break;
				case 1:
					$table='user_follow_data';
					$col=array('name'=>'response','value'=>1);
					break;
				case 2:
					$table='user_follow_data';
					$col=array('name'=>'response','value'=>0);
					break;
				case 3:
					$table='user_follow_data';
					$col=array('name'=>'status','value'=>0);
					break;
				default:
					return false;
					break;
			}
		}
		else if($Gtype[0]=='ei') {
			switch ($Gtype[1]) {
				case 0:
					$table=array('`feed_master`','`keywords`');
					// $col=array('name'=>'isClg','value'=>1);
					break;
				case 1:
					$table=array('`feed_master`','`keywords`');
					// $col=array('name'=>'isClg','value'=>1);
					break;
				case 2:
					/*
					 *	reserved for avg response 
					 */
					break;
				default:
					return false;
					break;
			}
		}

		if ($Gtype[0]=='fi') {
			$query="SELECT date(addedon) as label, count(id) as value FROM ". $table." WHERE ".$col['name']."=".$col['value']." AND `entity`='".$clgId."' AND `addedon` BETWEEN '".$param_arr[0]."' AND '".$param_arr[1]."' GROUP BY date(addedon)";
		}
		else {
			if($Gtype[1]==0) {
				$query="SELECT date(fm.addedon) as label, count(fm.id) as value FROM ".$table[0]." fm WHERE fm.addedon BETWEEN '".$param_arr[0]."' AND '".$param_arr[1]."' AND EXISTS (SELECT kw.pid FROM ".$table[1]." kw WHERE kw.isClg=1 AND fm.feed_id=kw.pid AND kw.clgId='".$clgId."')";
			} 
			else if($Gtype[1]==1) {
				$query="SELECT date(fm.addedon) as label, count(fm.id) as value from ".$table[0]." fm WHERE fm.bookmarks=1 AND fm.addedon BETWEEN '".$param_arr[0]."' AND '".$param_arr[1]."' AND EXISTS (SELECT kw.pid FROM ".$table[1]." kw WHERE fm.feed_id=kw.pid AND kw.clgId='".$clgId."')";
			}
			else if($Gtype[1]==2) {
				/*
				 * reserved for avg response time
				 */
			}
		}

		$query_exe=$this->con->query($query);
		$query_res=mysqli_fetch_all($query_exe,MYSQLI_ASSOC);

		return $query_res;
	}

	public function loadFullData($Gtype,$from,$to,$clgId) {
		$param_arr=$this->sanitizeParam(array($from,$to));
		$data=array('fi'=>array(),'ei'=>array());

		// get fi data
		$query="SELECT count(status) as count FROM `user_follow_data` WHERE `entity`='".$clgId."' AND `addedon` BETWEEN '".$param_arr[0]."' AND '".$param_arr[1]."' GROUP BY status";

		//SELECT count(status) as count, status, response FROM `user_follow_data` WHERE `addedon` BETWEEN '2018-01-01 00:00:00' AND '2018-03-03 00:00:00' group by status, response;

		$query_exe=$this->con->query($query);
		$query_res=mysqli_fetch_all($query_exe,MYSQLI_ASSOC);

		$data['fi']['revoked']=$query_res[0]['count']==null?0:$query_res[0]['count']; //status=0
		$data['fi']['interested']=$query_res[1]['count']==null?0:$query_res[1]['count']; //status=1

		$query="SELECT count(response) as count FROM `user_follow_data` WHERE `entity`='".$clgId."' AND `addedon` BETWEEN '".$param_arr[0]."' AND '".$param_arr[1]."' GROUP BY response";

		$query_exe=$this->con->query($query);
		$query_res=mysqli_fetch_all($query_exe,MYSQLI_ASSOC);

		$data['fi']['notReady']=$query_res[0]['count']==null?0:$query_res[0]['count']; //response=0
		$data['fi']['ready']=$query_res[1]['count']==null?0:$query_res[1]['count']; //response=1
		

		$graphData=$this->getGraphData(array('fi',$Gtype[0]),$from,$to,$clgId);

		$data['fi']['lineChart']=$graphData;
		// $this->reduceSets($graphData);
		$pieChart[]=array('label'=>'ready','value'=>$data['fi']['ready']);
		$pieChart[]=array('label'=>'notReady','value'=>$data['fi']['notReady']);
		$data['fi']['pieChart']=$pieChart;

		// get ei data
		$query="SELECT COUNT(fm.id) as count from feed_master fm WHERE fm.bookmarks=1 AND `addedon` BETWEEN '".$param_arr[0]."' AND '".$param_arr[1]."' AND EXISTS (SELECT kw.pid FROM keywords kw WHERE fm.feed_id=kw.pid AND kw.clgId='".$clgId."')";

		$query_exe=$this->con->query($query);
		$query_res=mysqli_fetch_all($query_exe,MYSQLI_ASSOC);

		$data['ei']['bookmarks']=$query_res[0]['count']==null?0:$query_res[0]['count'];

		$query="SELECT COUNT(fm.id) as count from feed_master fm WHERE `addedon` BETWEEN '".$param_arr[0]."' AND '".$param_arr[1]."' AND EXISTS (SELECT kw.pid FROM keywords kw WHERE kw.isClg=1 AND fm.feed_id=kw.pid AND kw.clgId='".$clgId."')";

		$query_exe=$this->con->query($query);
		$query_res=mysqli_fetch_all($query_exe,MYSQLI_ASSOC);

		$data['ei']['queries']=$query_res[0]['count']==null?0:$query_res[0]['count'];

		$data['ei']['lineChart']=$this->getGraphData(array('ei',$Gtype[1]),$from,$to,$clgId);

/* avg response time will be defined later
 *uncomment the below line to make it work
 */
		// $data['ei']['barChart']=$this->getGraphData(array('ei',$Gtype[1]),$from,$to,$clgId);



		return $data;
	}

}

// $dLoader=new dataLoader();
// print_r($dLoader->loadFullData("29!<s>--\/08/2017","29/09/--2017"));

?>